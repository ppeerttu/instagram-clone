from app.db.database import Database
from app.models.user import User
from app.user_producer import UserProducer
from app.config import kafka_producer_config
from app.domain_event import DomainEvent, DomainEventType

users_topic = kafka_producer_config["topic"]

class UserService():
    """User service class that handles domain specific operations. Use this when
    you want to publish domain events to message broker."""

    def __init__(self, database: Database, producer: UserProducer):
        super().__init__()
        self.db = database
        self.producer = producer

    def createUser(self, user: User) -> User:
        """Create an user into database and publish user created event.
        
        Arguments:
    
            user {User} -- The user
        
        Returns:

            User -- The created user
        """
        user = self.db.createUser(user)
        self.producer.publish(users_topic, DomainEvent(DomainEventType.CREATED, user.to_dict()))
        return user

    def deleteUserById(self, user_id: str) -> User:
        """Delete an user by id and publish user deleted event.
        
        Arguments:

            user_id {str} -- User's ID
        
        Returns:

            User -- The deleted user
        """
        user = self.db.deleteUserById(user_id)
        self.producer.publish(users_topic, DomainEvent(DomainEventType.DELETED, user.to_dict()))
        return user
