import json
import logging
from kafka import KafkaProducer
from app.config import kafka_producer_config
from app.domain_event import DomainEvent

logger = logging.getLogger("app.user_producer")

class UserProducer():
    """User event producer class that can be used to publish messages to Kafka."""

    def __init__(self):
        super().__init__()
        self.producer = KafkaProducer(
            bootstrap_servers=[kafka_producer_config["bootstrap_servers"]],
            value_serializer=lambda m: json.dumps(m).encode("ascii")
        )
    
    def error_callback(self, e: Exception):
        logger.error("Failed to publish an event", exc_info=e)

    def publish(self, topic: str, event: DomainEvent):
        """Publish an event to given topic.
        
        Arguments:

            topic {str} -- The target topic

            event {DomainEvent} -- The domain event to publish
        """
        self.producer.send(topic, event.to_dict()).add_errback(self.error_callback)

    def clean_up(self):
        """Cleanup the procuder. This will block until all messages has been flushed."""
        self.producer.flush()
        self.producer.close(2)
