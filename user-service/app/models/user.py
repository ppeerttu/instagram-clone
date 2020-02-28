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
