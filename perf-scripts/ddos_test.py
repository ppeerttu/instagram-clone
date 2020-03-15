from typing import Tuple
import logging
import time
import datetime
import os
import json
from lib.account_session import AccountSession
from lib.utis import random_string, create_image_form_data

logging.basicConfig(format="%(asctime)s %(process)d %(levelname)s %(name)s - %(message)s", level=logging.INFO)
logger = logging.getLogger("ddos_test")

test_run_id = random_string(length=20)
username = "test-{}".format(test_run_id)
password = username
domain = "http://a7ac0b2a18e3e4d5bb07861ca733b7c2-82784151.eu-central-1.elb.amazonaws.com"
image_small = "./img/south_america_small.jpg"   # ~ 1MB
mime_type_jpeg = "image/jpeg"
reports_dir = "./reports/ddos"
tmp_dir = "./tmp"

def parse_args(args: dict) -> str:
    """Parse a dictionary of arguments into string arguments for Apache Benchmark command.
    
    Arguments:

        args {dict} -- Arguments e.g. { 'H': '"Accept: application/json"' }
    
    Returns:

        str -- Stringified arguments e.g. '-H "Accept: application/json" '
    """
    str_args = ""
    for key, val in args.items():
        str_args += "-{} {} ".format(key, val)
    return str_args

def run_test(name: str, path: str, n: int, c: int, args: dict = None):
    """Run the ApacheBenchmark test with given arguments.
    
    Arguments:

        name {str} -- Human readable name for the test
        path {str} -- API Path e.g. '/api/users'
        n {int} -- Total count of requests to do
        c {int} -- Concurrency count
    
    Keyword Arguments:

        args {dict} -- Extra arguments for the command in a dict (default: {None})
    """
    ts = datetime.datetime.utcnow().isoformat()
    log_output = "{}/{}-{}-n{}-c{}.log".format(reports_dir, ts, name, n, c)
    logger.info("Running test {} with -n {} and -c {}, logging output to {}".format(
        name,
        n,
        c,
        log_output))
    str_args = parse_args(args) if args is not None else ""
    target = "{}{}".format(domain, path)
    cmd = "ab -r -n {} -c {} {}\"{}\" > {}".format(n, c, str_args, target, log_output)
    logger.info("Running command: {}".format(cmd)) # Prints progress to stderr
    os.system(cmd)
    logger.info("Test {} done".format(name))

def create_new_image(session: AccountSession) -> str:
    """Create a new image and return it's ID.
    
    Arguments:

        session {AccountSession} -- Current session
    
    Returns:

        str -- New image ID
    """
    image_data = create_image_form_data(image_small, mime_type_jpeg, session.account_id)
    r = session.post("/images", data=image_data, headers={'Content-Type': image_data.content_type})
    if r.status_code >= 300:
        logger.error("Failed to create image, status {} and body {}".format(r.status_code, r.text))
        session.clear()
        exit(1)
    return r.json()["id"]

if __name__ == "__main__":
    logger.info("Starting DDoS test with id {}".format(test_run_id))
    session = AccountSession(domain, username, password)
    session.prepare() # Access token will be valid for 30 minutes

    # Prepare test-specific constants
    image_id = create_new_image(session)
    auth_header = {
        'H': '"Authorization: Bearer {}"'.format(session.access_token)
    }
    n = 2500
    c_max = 100
    c_med = 50
    c_min = 10
    path_user = "/users/{}".format(session.account_id)
    path_image_data = "/images/{}/data".format(image_id)
    path_image_meta = "/images/{}/meta".format(image_id)
    test_users = "get_user"
    test_image_data = "get_image_data"
    test_image_meta = "get_image_meta"

    def get_test_cases(name: str, path: str, args: dict) -> Tuple[Tuple]:
        return (
            (name, n, c_max, path, args),
            (name, n, c_med, path, args),
            (name, n, c_min, path, args)
        )
    
    tests_users_service = get_test_cases(test_users, path_user, auth_header)
    test_image_service = get_test_cases(test_image_data, path_image_data, auth_header)
    test_image_service = test_image_service + get_test_cases(test_image_meta, path_image_meta, auth_header)
    simple_test_cases = tests_users_service + test_image_service

    time_to_sleep = 30
    i = 0
    # Run "simple" read-only test cases against user-service and image-service
    for test in simple_test_cases:
        i += 1
        name, n, c, path, args = test
        run_test(name, path, n, c, args)
        if i != len(simple_test_cases):
            logger.info("Delaying the next test for {} seconds...".format(time_to_sleep))
            time.sleep(time_to_sleep)

    # Prepare 3 images for comment-service
    image_ids = [create_new_image(session) for i in range(3)]
    logger.info("Created images for comments test: {}".format(image_ids))
    test_comment_post = "post_comment"
    test_comment_get = "get_comments"

    comment_data = {
        'content': 'Fixed sized content for the comment that is being posted to image',
        'tags': ['foo', 'bar'],
        'userTags': ['johndoe', 'donaldtrump']
    }
    json_file = "{}/comment_data.json".format(tmp_dir)
    with open(json_file, "w") as outfile:
        json.dump(comment_data, outfile)
        logger.info("Comment JSON dumped to {}".format(json_file))

    comment_tests = []
    c_vals = [c_max, c_med, c_min]
    i = 0
    for im_id in image_ids:
        args = {
            'p': json_file, # Post data from file
            'T': 'application/json'
        }
        args.update(auth_header) # Add Authorization header to args
        path = "/images/{}/comments".format(im_id)
        comment_tests.append(
            (test_comment_post, n, c_vals[i], path, args)
        )
        comment_tests.append(
            (test_comment_get, n, c_vals[i], "{}?size=20".format(path), auth_header)
        )
        i += 1
    
    i = 0
    # Run tests against comment-service
    for test in comment_tests:
        i += 1
        name, n, c, path, args = test
        run_test(name, path, n, c, args)
        if i != len(comment_tests):
            logger.info("Delaying the next test for {} seconds...".format(time_to_sleep))
            time.sleep(time_to_sleep)

    session.clear()
    logger.info("Stopping DDoS test with id {}".format(test_run_id))

