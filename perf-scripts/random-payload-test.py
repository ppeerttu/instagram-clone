import logging
import time
import json
import string, random   
import sys
from lib.account_session import AccountSession
from requests_toolbelt.multipart.encoder import MultipartEncoder

username = "test-user-17"
password = "test-user-1"
domain = "http://a7ac0b2a18e3e4d5bb07861ca733b7c2-82784151.eu-central-1.elb.amazonaws.com"

image = "./img/south_america_small.jpg"
mime_type_jpeg = "image/jpeg" 
req_times = []

logging.basicConfig(format="%(asctime)s %(process)d %(levelname)s %(name)s - %(message)s", level=logging.INFO)
logger = logging.getLogger("random-payload-test")

def create_image_form_data(file: str, mime: str, user_id: str) -> MultipartEncoder:
    """Create image form data for posting image.
    
    Arguments:

        file {str} -- The file name from where to load the image file
        mime {str} -- Image mime type ('image/png' / 'image/jpeg')
        user_id {str} -- The user ID (account ID)
    
    Returns:

        MultipartEncoder -- The multipart form encoder with the data
    """
    return MultipartEncoder(
        fields={
            'image': (file, open(file, 'rb'), mime),
            'userId': user_id,
            'caption': 'Just a sample image with @johndoe #distributed #systems'
        }
    )

def post_and_read_image(file: str, mime: str, session: AccountSession) -> str:
    data = create_image_form_data(file, mime, session.account_id)
    start = time.time()
    r = session.post("/images", data=data, headers= { "Content-type": data.content_type })
    if r.status_code > 300:
        logger.warning("Failed to post image, res: {}".format(r))
    else:
        asJson = r.json()
        imageId = asJson["id"]
        end = time.time()
        req_times.append(end - start)
        start = time.time()
        r = session.get("/images/{}".format(imageId))
        end = time.time()
        req_times.append(end - start)
    
    return imageId
    
def post_comment(imageId: str, session: AccountSession):
    comment = ''.join(random.choice(string.ascii_lowercase) for x in range(random.randint(1, 200)))
    tag = "test"
    tags = []
    userTags = []
    for i in range(random.randint(1,20)):
        tags.append(tag)
        userTags.append(tag)

    commentPost = { "content": comment, "tags": tags, "userTags": userTags }
    start = time.time()
    r = session.post("/images/{}/comments".format(imageId), data=json.dumps(commentPost), headers= { "Content-type": "application/json"})
    if r.status_code > 300:
        logger.warning("Received response status {} with body {}".format(r.status_code, r.json()))
    
    asJson = r.json()
    end = time.time()
    req_times.append(end - start)
    
    return asJson["id"]

def read_comments(imageId: str, session: AccountSession):
    start = time.time()
    r = session.get("/images/{}/comments".format(imageId))
    end = time.time()
    req_times.append(end - start)

if __name__ == "__main__":
    sequences = 5
    if len(sys.argv) > 1:
        sequences = int(sys.argv[1])
        
    session = AccountSession(domain, username, password)
    start = time.time()
    logger.info("Starting random payload testing with {} seuqences".format(sequences))
    session.prepare()
    try:
        for x in range(sequences):
            logger.info("iteration number {}".format(x + 1))
            imageId = post_and_read_image(image, mime_type_jpeg, session)
            for i in range(6):
                commentId = post_comment(imageId, session)
            read_comments(imageId, session)
            read_comments(imageId, session)
                
    except:
        logger.warning("Encountered error, stopping test.")
        session.clear()
    else:
        end = time.time()
        avg = sum(req_times) / len(req_times)
        logger.info("Random payload testing ended, elapsed time {:.3f}".format(end - start))
        logger.info("Measured requests: {}".format(len(req_times)))
        logger.info("Average request time: {:.3f}".format(avg))
        session.clear()