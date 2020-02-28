
import sqlalchemy as db
from sqlalchemy.orm import Session
import datetime
from typing import List
from sqlalchemy.exc import IntegrityError
from app.models.base import Base
from app.models.user import User
from app.db.exceptions import IdExistsError, UsernameExistsError, EntityNotFoundError
from app.db.utils import Page

MAX_PAGE_SIZE = 100
MIN_PAGE_SIZE = 1
DEFAULT_PAGE_SIZE = 20
MIN_PAGE_NUM = 1
MAX_PAGE_NUM = 1000
DEFAULT_PAGE_NUM = 1

class Database():

    def __init__(self, config):
        self.engine = db.create_engine(
            'postgresql://{}:{}@{}:{}/{}'.format(
                config['username'],
                config['password'],
                config['host'],
                config['port'],
                config['database']
            )
        )
        self.connection = self.engine.connect()

    def findUserById(self, id: str) -> User:
        """Find user by ID.
        
        Arguments:

            id {str} -- User's ID
        
        Returns:

            User -- The found user or None if not found
        """
        session = Session(bind=self.engine)
        return session.query(User).filter_by(id=id).first()

    def findUserByUsername(self, username: str) -> User:
        """Find user by username.
        
        Arguments:

            username {str} -- User's username
        
        Returns:

            User -- The found user or None if not found
        """
        session = Session(bind=self.engine)
        return session.query(User).filter_by(username=username).first()

    def createUser(self, user: User):
        """Create a new user into database.
        
        Arguments:

            user {User} -- New user instance

        Raises:

            IdExistsError: A user with this ID already exists
            UsernameExistsError: A user with this username already exists
        """
        session = Session(bind=self.engine)
        # Check if user ID already exists
        if self.findUserById(user.id) is not None:
            raise IdExistsError
        # Check if username already exists
        if self.findUserByUsername(user.username) is not None:
            raise UsernameExistsError

        session.add(user)
        session.commit()

    def getAllUsers(self, page: int = 1, size: int = 20) -> Page:
        """Find all users as paginated result set.
        
        Keyword Arguments:

            page {int} -- Page number (starting from 1) (default: {1})
            size {int} -- Page size (default: {20})
        
        Returns:

            {Page} -- The results wrapped in Page
        """
        size = DEFAULT_PAGE_SIZE if size < MIN_PAGE_SIZE else min(size, MAX_PAGE_SIZE)
        page = DEFAULT_PAGE_NUM if page < MIN_PAGE_NUM else min(page, MAX_PAGE_NUM)

        lower_limit = (page - 1) * size
        upper_limit = page * size

        session = Session(bind=self.engine)
        # Note: Ideally, these two queries should be done concurrently
        users = session.query(User).order_by(User.created_at)[lower_limit:upper_limit]
        count = session.query(User).count()
        return Page(page, size, count, users)

    def deleteUserById(self, user_id: str):
        """Delete a user by ID.
        
        Arguments:

            user_id {str} -- User's ID
        
        Raises:

            EntityNotFoundError: The user doesn't exist
        """
        session = Session(bind=self.engine)
        user = session.query(User).filter_by(id=user_id).first()
        if user is None:
            raise EntityNotFoundError
        session.delete(user)
        session.commit()



