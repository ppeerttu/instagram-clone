import datetime
from sqlalchemy import MetaData, Table, Column, String, DateTime
from app.models.base import Base

class User(Base):
    """Model for users."""
    __tablename__ = "users"

    id = Column(String, primary_key=True)
    username = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)

    def __repr__(self):
        return "<User(id='{}', username='{}', created_at='{}', updated_at='{}')>".format(
            self.id,
            self.username,
            self.created_at,
            self.updated_at
        )
    
    def to_dict(self) -> dict:
        """Convert this user to a dict."""
        return {
            'id': str(self.id),
            'username': str(self.username),
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

def map_from_json(json_data) -> User:
    """Create an instance of User out of JSON data.
    
    Arguments:

        json_data {dict} -- JSON data in a dictionary
    
    Returns:

        User -- The created user instance

    Raises:

        AssertionError - Received unexpected data format
    """
    id_raw = json_data["id"]
    username_raw = json_data["username"]
    assert isinstance(id_raw, str), "Received unexpected JSON data: {json_data}"
    assert isinstance(username_raw, str), "Received unexpected JSON data: {json_data}"
    return User(id=id_raw, username=username_raw)
