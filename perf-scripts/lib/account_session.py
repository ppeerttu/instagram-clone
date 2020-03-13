import requests
from requests import Response
import logging

logger = logging.getLogger("lib.account_session")

class AccountSession():

    def __init__(self, domain: str, username: str, password: str):
        super().__init__()
        self.username = username
        self.password = password
        self.access_token = None # type: str
        self.refresh_token = None # type: str
        self.account_id = None # type: str
        self.domain = domain

    def prepare(self):
        """Prepare the account. This performs both sign_up and sign_in methods."""
        if self.account_id is None:
            self.sign_up()
        if self.access_token is None:
            self.sign_in()

    def clear(self):
        """Clear the session. Delete the possibly created account and reset account id + tokens."""
        if self.access_token:
            self.delete_account()
        self.access_token = None
        self.refresh_token = None
        self.account_id = None

    def sign_up(self):
        """Sign up the account."""
        r = self.post(
            "/auth/sign-up",
            data={
                'username': self.username,
                'password': self.password
            }
        )
        if r.status_code > 300:
            raise Exception("Failed to sign up, status {} and body {}".format(r.status_code, r.json()))
        body = r.json()
        self.account_id = body["id"]
        logger.info("Created account {} with id {}".format(self.username, self.account_id))

    def sign_in(self):
        """Sign in the account. This populates the access_token and refresh_token."""
        r = self.post(
            "/auth/sign-in",
            data={
                'username': self.username,
                'password': self.password
            }
        )
        if r.status_code != 200:
            raise Exception("Sign in failed, status {} and body {}".format(r.status_code, r.json()))
        body = r.json()
        self.access_token = body["accessToken"]
        self.refresh_token = body["refreshToken"]

    def delete_account(self):
        """Delete this account. This will also cause the system to cleanup resources that
        has been created by this account."""
        assert self.account_id is not None, "The account_id has to be set in order to be able to delete the account"
        r = self.delete(
            "/auth/me"
        )
        if r.status_code != 204:
            raise Exception("Account deletion failed, status {} and body {}".format(r.status_code, r.json()))
        logger.info("Deleted account {} with id {}".format(self.username, self.account_id))

    def request(self, method: str, path: str, data: dict = None, params: dict = None, headers: dict = None, files: dict = None) -> Response:
        """Perform a request with the requests library.
        
        Arguments:

            method {str} -- HTTP method (GET | PUT | POST | DELETE)
            path {str} -- The API path e.g. '/auth/me'
        
        Keyword Arguments:

            data {dict} -- JSON payload for the request (default: {None})
            params {dict} -- Query parameters for the request (default: {None})
            headers {dict} -- Headers for the request (default: {None})
            files {dict} -- Files for the request (multipart form) (default: {None})
        
        Returns:

            Response -- The response instance
        """
        if self.access_token:
            headers = headers if headers is not None else {}
            headers["Authorization"] = "Bearer {}".format(self.access_token)
        args = { 'data': data, 'params': params, 'headers': headers, 'files': files }
        return requests.request(
            method,
            self.domain + path,
            **args
        )

    def get(self, path: str, data: dict = None, params: dict = None, headers: dict = None, files: dict = None) -> Response:
        """Forward a GET request to AccountSession.request() method."""
        args = { 'data': data, 'params': params, 'headers': headers, 'files': files }
        return self.request("GET", path, args)

    def post(self, path: str, data: dict = None, params: dict = None, headers: dict = None, files: dict = None) -> Response:
        """Forward a POST request to AccountSession.request() method."""
        args = { 'data': data, 'params': params, 'headers': headers, 'files': files }
        return self.request("POST", path, **args)
    
    def put(self, path: str, data: dict = None, params: dict = None, headers: dict = None, files: dict = None) -> Response:
        """Forward a PUT request to AccountSession.request() method."""
        return self.request("PUT", path, data, params, headers, files)
    
    def delete(self, path: str, data: dict = None, params: dict = None, headers: dict = None, files: dict = None) -> Response:
        """Forward a DELETE request to AccountSession.request() method."""
        return self.request("DELETE", path, data, params, headers, files)
    
