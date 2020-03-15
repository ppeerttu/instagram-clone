import logging
import time
from lib.account_session import AccountSession
from lib.utis import create_image_form_data

logging.basicConfig(format="%(asctime)s %(process)d %(levelname)s %(name)s - %(message)s", level=logging.INFO)
logger = logging.getLogger("main")

username = "test-user-1"
password = "test-user-1"
domain = "http://a7ac0b2a18e3e4d5bb07861ca733b7c2-82784151.eu-central-1.elb.amazonaws.com"
image_small = "./img/south_america_small.jpg"   # ~ 1MB
image_medium = "./img/south_america_original.jpg" # ~ 5MB
image_large = "./img/south_america_large.jpg"   # ~ 10MB
mime_type_jpeg = "image/jpeg"
mime_type_png = "image/png"


def test_upload_average(file: str, mime: str, session: AccountSession, iter: int = 25) -> float:
    """Test upload average time with given file and iterations.
    
    Arguments:

        file {str} -- The file name
        mime {str} -- The mime type
        session {AccountSession} -- Current AccountSession
    
    Keyword Arguments:

        iter {int} -- Count of iterations (number of images to upload) (default: {25})
    
    Returns:

        float -- Average time in seconds
    """
    req_times = []
    for i in range(iter):
        logger.debug("Testing with file {} at iteration {}".format(file, i))
        data = create_image_form_data(file, mime, session.account_id)
        start = time.time()
        r = session.post("/images", data=data, headers={ "Content-Type": data.content_type })
        end = time.time()
        req_times.append(end - start)
        if r.status_code > 300:
            logger.warning("Received response status {} with body {}".format(r.status_code, r.json()))

    return sum(req_times) / len(req_times)

if __name__ == "__main__":
    session = AccountSession(domain, username, password)
    session.prepare()

    test_cases = (
        (image_small, mime_type_jpeg, 25),
        (image_medium, mime_type_jpeg, 25),
        (image_large, mime_type_jpeg, 25)
    )

    for t in test_cases:
        file_name, mime_type, iterations = t
        try:
            logger.info("Testing with file {}, mime type {} and iterations {}".format(file_name, mime_type, iterations))
            avg = test_upload_average(file_name, mime_type, session, iterations)
            logger.info("Average request time is {:.3f} seconds".format(avg))
        except Exception as e:
            logger.error(e)

    session.clear()
