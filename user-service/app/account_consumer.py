from threading import Thread
from kafka import KafkaConsumer
import json
import logging

from app.config import kafka_consumer_config
from app.db.database import Database
from app.models.user import User, map_from_json as user_from_json
from app.domain_event import DomainEvent, DomainEventType

logger = logging.getLogger("app.account_consumer")

class AccountConsumer():
    """Class consuming account events. Works with threads."""

    def __init__(self, database: Database):
        super().__init__()
        self.consumer = KafkaConsumer(
            group_id=kafka_consumer_config["group_id"],
            bootstrap_servers=[kafka_consumer_config["bootstrap_servers"]],
            auto_offset_reset="earliest",
            enable_auto_commit=True,
            value_deserializer=AccountConsumer.decode_json,
            consumer_timeout_ms=2000 # Stop consuming after 2 seconds of idle
        )
        self.db = database
        self.shutting_down = False
        self.main_thread = None #type: Thread

    @staticmethod
    def decode_json(message):
        """JSON message decoder to be used in Kafka consumer."""
        try:
            return json.loads(message.decode("ascii"))
        except Exception as e:
            logger.warn("Failed to decode message as JSON, {}".format(str(e)))

    def consume_batch(self):
        """Consume a batch of events. The consumer will iterate until a period of
        consumer_timeout_ms is passed without new messages."""
        for m in self.consumer:
            try:
                event = DomainEvent.map_from_json(m.value)
                if event.type is DomainEventType.CREATED:
                    self.handle_create(event.data)
                elif event.type is DomainEventType.DELETED:
                    self.handle_delete(event.data)
                else:
                    logger.info("Unexpected domain event type: {}".format(event.type))
            except Exception as e:
                logger.error("Received invalid data from Kafka", e)

    def launch_child_threads(self):
        """Launch consumer threads in a while loop as long as we are not shutting down. Each
        consumer thread will close after being 2 seconds being idle."""
        logger.info("Main account consumer thread started")

        while not self.shutting_down:
            thread = Thread(target=self.consume_batch)
            thread.start()
            thread.join()

        logger.info("Main account thread consumer stopped")


    def start(self):
        """"Start the consuming by launching a main background thread that will manage
        consuming process by spawning a consumer thread one after another."""
        topic = kafka_consumer_config["topic"]
        self.consumer.subscribe(topic)
        logger.info("AccountConsumer subscribed to topic {}".format(topic))
        self.main_thread = Thread(target=self.launch_child_threads)
        self.main_thread.start()

    def stop(self):
        """Stop the consumer and wait for threads to finish."""
        self.shutting_down = True
        if self.main_thread  is not None:
            self.main_thread.join()
            self.consumer.close()

    def handle_create(self, data):
        try:
            user = user_from_json(data)
            self.db.createUser(user)
        except Exception as e:
            logger.error("Failed to create user from user event", e)

    def handle_delete(self, data):
        try:
            user = user_from_json(data)
            self.db.deleteUserById(user.id)
        except Exception as e:
            logger.error("Failed to delete user from user event", e)
