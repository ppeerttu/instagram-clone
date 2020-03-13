import requests

def multipart_form_post(url: str, data: dict) -> dict:
    """Post multipart form data.
    
    Arguments:

        url {str} -- Destination URL
        data {dict} -- The data
    
    Returns:

        dict -- The response data or None if no response
    """
    response = requests.post(url, files=data)
    if response.status_code == 201:
        return response.json()
    return None
