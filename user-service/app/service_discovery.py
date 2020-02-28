import consul
import uuid
import platform
from app.config import consul_config, grpc_config
from app.utils import Interval
from typing import Callable

class ServiceDiscovery():
    """Service discovery class for publishing this service into Consul."""

    def __init__(self, failed_heartbeat_handler: Callable[[Exception], None] = None):
        """Construct a new service discovery instance.
        
        Keyword Arguments:

            failed_heartbeat_handler {Callable[[Exception], None]} -- Handler for failed heartbeats (default: {None})
        """
        super().__init__()
        self.registered = False
        self.consul = consul.Consul(host=consul_config["host"], port=consul_config["port"])
        self.service_name = consul_config["client_name"]
        self.instance_id = str(uuid.uuid4())
        self.heartbeat_seconds = 10
        self.healthy = True
        self.interval = None # type: Interval
        self.failed_heartbeat_handler = failed_heartbeat_handler

    def register(self):
        """Register the service into Consul."""
        self.consul.agent.service.register(
            name=self.service_name,
            service_id=self.instance_id,
            address=platform.node(),
            port=grpc_config["port"],
            check=consul.Check().ttl("{}s".format(self.heartbeat_seconds))
        )
        self.registered = True
        self.interval = Interval(8, self.pass_heartbeat)
        self.pass_heartbeat()

    def pass_heartbeat(self):
        """Pass another heartbeat (let Consul know that we are healthy)."""
        try:
            self.consul.agent.check.ttl_pass("service:{}".format(self.instance_id))
            self.healthy = True
        except Exception as e:
            self.healthy = False
            if self.failed_heartbeat_handler is not None:
                self.failed_heartbeat_handler(e)
            else:
                raise e

    def deregister(self):
        """Deregister the service from Consul."""
        self.consul.agent.service.deregister(self.instance_id)
        self.registered = False
        if self.interval is not None:
            self.interval.cancel()
            self.interval = None
