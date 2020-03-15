import signal
from signal import Signals
from requests_toolbelt.multipart.encoder import MultipartEncoder
import logging
import random
import string

class SignalDetector():
    """A class that subscribes to OS signal events and can tell when process should
    be cleaned up and shut down.
    """

    signal_detected = False

    # Signals to listen for
    signals = [
        signal.SIGTERM,
        signal.SIGINT,
        signal.SIGUSR1,
        signal.SIGUSR2
    ]
    logger = logging.getLogger("lib.utils.SignalDetector")

    def __init__(self):
        super().__init__()
        for s in self.signals:
            signal.signal(s, self.detect_signal)
    
    def detect_signal(self, s: Signals, frame):
        self.signal_detected = True
        self.logger.info("Signal detected")


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

def random_string(length: int = 10) -> str:
    """Generate a random string.
    
    Keyword Arguments:

        length {int} -- String length (not including prefix/suffix) (default: {10})
    
    Returns:

        str -- Generated string
    """
    return "".join(random.choice(string.ascii_lowercase) for i in range(length))
