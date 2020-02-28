
class UsernameExistsError(Exception):
    """Username already taken exception."""
    pass

class IdExistsError(Exception):
    """ID already exists exception."""
    pass

class EntityNotFoundError(Exception):
    """Error thrown when expecting an entity to exist but it doesn't."""
    pass

