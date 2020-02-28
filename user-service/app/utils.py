import time, threading
import signal
from signal import Signals
from typing import Callable

class Interval():
    """Class for handling non-blocking periodic tasks in intervals.
    """

    def __init__(self, seconds: int, action: Callable[[], None]):
        """Create a new interval instance.
        
        Arguments:

            seconds {int} -- Interval time e.g. 8 means that run action every 8 seconds
        
            action {Callable[[], None]} -- The action to run
        """
        super().__init__()
        self.seconds = seconds
        self.action = action
        self.stop_event = threading.Event()
        thread = threading.Thread(target=self.__interval)
        thread.start()

    def __interval(self):
        """Internal function to run with the thread.
        """
        next_time = time.time() + self.seconds
        while not self.stop_event.wait(next_time - time.time()):
            next_time += self.seconds
            self.action()
    
    def cancel(self):
        """Cancel the interval.
        """
        self.stop_event.set()

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

    def __init__(self):
        super().__init__()
        for s in self.signals:
            signal.signal(s, self.detect_signal)
    
    def detect_signal(self, s: Signals, frame):
        self.signal_detected = True

