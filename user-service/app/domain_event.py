from enum import Enum
import json

class DomainEventType(Enum):
    CREATED = "CREATED"
    UPDATED = "UPDATED"
    DELETED = "DELETED"
    NOT_SET = "NOT_SET"

class DomainEvent():

    def __init__(self, event_type: DomainEventType, data):
        super().__init__()
        self.type = event_type
        self.data = data

    def to_dict(self) -> dict:
        return {
            'type': self.type.value,
            'data': self.data
        }

    @staticmethod
    def map_from_json(json_object):
        type_plain = json_object["type"]
        data_plain = json_object["data"]
        if type_plain in DomainEventType.__members__:
            return DomainEvent(DomainEventType[type_plain], data_plain)
        raise Exception("Domain event type was not recognized")