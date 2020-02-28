from typing import List

class Page():
    """Result page from database query."""
    
    def __init__(self, page: int, size: int, total_count: int, data: List):
        """Create a new Page result.
        
        Arguments:

            page {int} -- The page number
            size {int} -- The page size in the query
            total_count {int} -- Total count of results
            data {List} -- Actual page results
        """
        self.page = page
        self.size = size
        self.total_count = total_count
        self.data = data
