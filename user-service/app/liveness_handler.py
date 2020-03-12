from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer, HTTPServer
from threading import Thread
from typing import Callable, List
import logging

liveness_logger = logging.getLogger("LivenessChecker")
HEALTH_PATH = "/health"

class LivenessHandler():
    """Class managing Web server for liveness checks."""

    def __init__(self, port: int, checks: List[Callable]):
        super().__init__()
        class LivenessChecker(BaseHTTPRequestHandler):
            """Request handler class."""

            def handle_check(self):
                if self.path != HEALTH_PATH:
                    self.send_response(404)
                    self.end_headers()
                    return

                success = True
                try:
                    for check in checks:
                        if not check():
                            success = False
                except Exception as e:
                    success = False
                    liveness_logger.error("Liveness check raised exception", e)

                self.send_response(200 if success else 503)
                self.end_headers()

            do_GET = handle_check
            do_POST = handle_check
            do_PUT = handle_check
            do_DELETE = handle_check

        self.checks = checks
        self.logger = logging.getLogger("LivenessHandler")
        self.port = port
        server_address = ("", port)
        self.server = ThreadingHTTPServer(server_address, LivenessChecker)
        self.thread = None # type: Thread
    
    def listen(self):
        """Listen for incoming HTTP connections. Spawns a new thread for server."""
        self.thread = Thread(target=self.start_server)
        self.thread.start()

    def start_server(self):
        """Start the web server. This is supposed to be used within a thread (it's blocking)."""
        self.logger.info("Web server listening on {}".format(self.port))
        self.server.serve_forever(2)
        self.logger.info("Web server stopped")
    
    def stop(self):
        """Stop the HTTP server and wait for it's thread to join."""
        if self.thread is not None:
            self.server.shutdown()
            self.thread.join()