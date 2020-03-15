# perf-scripts

According to the course work description, the system "performance" has to be evaulated by answering ceratin set of questions. As the original set of questions was not fully suitable for this system, we adjusted them to match more the requirements of this system. The scripts in this directory are meant to be used to answer the following questions:

* _What is the average time for sending 50 messages between
two nodes (random payload)?_
* _Choose 3 different fixed message sizes (payloads for min,
average, max), what is the average time when sending 25 in
each case?_
* _Test the system performance by stressing it with external HTTP requests_

Please see the detailed test cases and reports further down.

## Preparations for the tests

The tests have several requirements:

* `Python 3` and `pip` installed
* `ab`, Apache Benchmark for performance / DDoS test

Install the Python dependencies from [requirements.txt](requirements.txt) with:

```bash
# OPTIONAL: Create and activate virtual env
python -m virtualenv env
source env/bin/activate

# Install required dependencies
pip install -r requirements.txt
```

You can test whether or not you have [ab](https://httpd.apache.org/docs/2.4/programs/ab.html) installed by just issuing `ab --version`. Installation of it is beyond this document.

## Test report circumstances

This file contains a report for each test. The system under the test was deployed to Kubernetes cluster running in AWS, region `eu-central-1` (Frankfurt) and the cluster contained three (3) EC2 instances; one (1) `m3.medium` master node, and two (2) `t2.medium` worker nodes. The location of the tester (client) was Oulu, Finland.

The cluster was set up according to [deployment instructions](../deployments/README.md), and thus every service had the following HPA config.

| Service | Min pods | Max pods | CPU percent |
|---------|----------|----------|-------------|
| auth-service | 2 | 5 | 50 |
| comment-service | 2 | 5 | 50 |
| image-service | 2 | 5 | 50 |
| rest-api | 2 | 5 | 50 |
| user-service | 2 | 5 | 50 |

Before running the tests, each service was deployed at their minimum pod count (2).


## Test 1: Average time, 50 requests, random payload

The random payload test consisted of comment post/reads and a image post/read.
The post and read is always done sequentally, e.g a comment is read with a GET request right after it's posted.
The image was fixed size: the smallest test image(1mb), so the payload isn't exactly "random".
The comments were more random: the comment itself was a random string of length 1-200, and the tag and userTag lists were of length 1-20, with the tags being a fixed size of 4 chars.

The test itself does iterations of following sequence:
* One image post/read: POST /images -> GET /images/:imageId (2 requests)
* 6 random comment posts: POST /comments (6 requests) 
* 2 list requests for the created 6 comments: GET /images/:imageId/comments (2 requests)
Total measured requests in the sequence is 10

Note: The test also does a sign-in, sign-up, account-clear sequence to setup and clear up the test, these requests aren't measured.

### Test

Running the script:
```
python3 random-payload-test.py
```
You can pass the wanted amount of test sequences, default is 5 (50 requests in total):
```
python3 random-payload-test.py 1
```


example log output:
```
2020-03-14 12:35:16,295 1070 INFO random-payload-test - Starting random payload testing with 5 seuqences
2020-03-14 12:35:18,001 1070 INFO lib.account_session - Created account test-user-17 with id 6fc0f5c2-6bae-41b7-8206-ae9e21d76799
2020-03-14 12:35:19,538 1070 INFO random-payload-test - iteration number 1
2020-03-14 12:35:21,551 1070 INFO random-payload-test - iteration number 2
2020-03-14 12:35:23,691 1070 INFO random-payload-test - iteration number 3
2020-03-14 12:35:25,749 1070 INFO random-payload-test - iteration number 4
2020-03-14 12:35:27,889 1070 INFO random-payload-test - iteration number 5
2020-03-14 12:35:30,085 1070 INFO random-payload-test - Random payload testing ended, elapsed time 13.791
2020-03-14 12:35:30,086 1070 INFO random-payload-test - Measured requests: 50
2020-03-14 12:35:30,087 1070 INFO random-payload-test - Average request time: 0.210
2020-03-14 12:35:30,191 1070 INFO lib.account_session - Deleted account test-user-17 with id 6fc0f5c2-6bae-41b7-8206-ae9e21d76799
```

### Conclusions:

* The average request takes 0.2 - 0.25 seconds
* The average request time starts to decrese as total iterations increase
    * -> system starts to scale up
* The image posts are noticably the requests that take the most time

## Test 2: Three different fixed sized messages, average request time

The testing of three different fixed size messages is done in this case by uploading three images of different sizes. The feature used in this test is representing the same as posting an image to Instagram.

The images that are posted in this test are:

* [Small image](img/south_america_small.jpg) (~1MB)
* [Medium image](img/south_america_original.jpg) (~5MB)
* [Large image](img/south_america_large.jpg) (~10MB)

Within the test, we upload each image **25** times and calculate the average request time. You can run the tests simply with:

```bash
python images-perf-test.py
```

Please note that for each test, the script creates and eventually deletes a **new** user account. This forces the system to delete all related data such as images and comments from all services (we have limited resources on the cluster).

### Test report

This is a report from a test that was ran on Friday 13th of March, 2020 at 9:30AM - 10:30AM. The test run took roughly 5 minutes. The log output was as follows:

```log
2020-03-13 09:44:18,079 59055 INFO lib.account_session - Created account test-user-1 with id 2457edaf-686c-47c9-a796-9568672d628d
2020-03-13 09:44:19,857 59055 INFO main - Testing with file ./img/south_america_small.jpg, mime type image/jpeg and iterations 25
2020-03-13 09:44:43,659 59055 INFO main - Average request time is 0.951 seconds
2020-03-13 09:44:43,660 59055 INFO main - Testing with file ./img/south_america_original.jpg, mime type image/jpeg and iterations 25
2020-03-13 09:46:12,297 59055 INFO main - Average request time is 3.545 seconds
2020-03-13 09:46:12,297 59055 INFO main - Testing with file ./img/south_america_large.jpg, mime type image/jpeg and iterations 25
2020-03-13 09:49:06,242 59055 INFO main - Average request time is 6.957 seconds
2020-03-13 09:49:06,688 59055 INFO lib.account_session - Deleted account test-user-1 with id 2457edaf-686c-47c9-a796-9568672d628d
```

During the test, the system state was observed through Kubernetes dashboard. During the tests, the pod count of `image-service` was increased by the HPA to the maximum number of five (5). Interestingly, other services didn't scale up.

The results show that the image size does indeed affect to the upload time.

| Image size | Avg. upload time (seconds) |
|------------|----------------------------|
| ~1MB | 0.951 |
| ~5MB | 3.545 |
| ~10MB | 6.957 |

Linear graph courtesy of [RapidTables](https://www.rapidtables.com/tools/line-graph.html).

![Upload times in linear chart](./img/reports/image-upload/bar-graph.png "Upload times in linear chart")

A few minutes after the test the cluster started to drop down the count of `image-service` pods. The minimum count of two (2) pods was reached around 10:10AM, roughly 10 minutes after the test.

### Conclusions

As the results show, the growth of upload image size appears to have linear impact to the upload time. The implementation of the image upload involves first uploading the image to Node.js server (`rest-api`), and then forwarding it to Java server (`image-service`) using gRPC streaming request. It has been noted during the system development that the chunk size of gRPC streaming has significant impact to the request time, and no advanced research was done in that area. Thus, it might be possible to increase the upload performance by finding optimal chunk size for the images, but that would also require investigation on what is the average size of an image uploaded to Instagram.

## Test 3: System stress test

The initial idea of the system stress test was to find out at what point the system would fail due to too heavy load. However, after doing some debugging on the area, we realized that it would require a bit more sophisticated DDoS techniques to bring the system down (at least several clients). Thus, this test is more like a general stress test where series of heavy loads are being poured down to the cluster and effects observed.

Within the test, there are several selected constraints. Each test is targeting (at least) to one service. That means, that the requests are always flowing through the `rest-api` serivce, and the actual target service is being consumed via gRPC from `rest-api`. Each test contains 2500 HTTP requests, and each test is repeated three times with different concurrency level: 100, 50 and 10. Between each test at least **30 seconds** are waited in order to let the system "cool down" (in reality much longer periods should be waited, but it just takes too much time). Here are detailed descriptions of the tests:

| Name      | Target service    | API Path  | Method    | Description |
|-----------|-------------------|-----------|-----------|-------------|
| get_user  | [user-service](../user-service) | `/users/:id` | **GET** | Get single user as JSON |
| get_image_data | [image-service](../image-service) | `/images/:id/data` | **GET** | Get raw image data |
| get_image_meta | [image-service](../image-service) | `/images/:id/meta` | **GET** | Get image metadata as JSON |
| post_comment | [comment-service](../comment-service) | `/images/:id/comments` | **POST** | Post new comment as JSON |
| get_comments | [comment-service](../comment-service) | `/images/:id/comments` | **GET** | Get image comments as JSON (limit 20) |

In case you're wondering why [auth-service](../auth-service) or [rest-api](../rest-api) aren't present in the table, it's because they don't offer similar APIs as the three services above do. However, `rest-api` is being used in **every** test as it's the only public endpoint to the system. Also `auth-service` is heavily stressed during the tests as every test but one (get_image_data) is using it at least for access control. Thus, as later observed, the `auth-service` and `rest-api` are both under heavy load always before the other services.

You can run the test with Python using:

```bash
python ddos_test.py
```

The `ad` test reports are outputted to [reports/ddos](reports/ddos).

### Test report

The test was ran at 14th of March 2020 between 3:50PM and 4:30PM and it took roughly 25 minutes. Here is a caption of the [log output](reports/2020-03-14-ddos.log):

```log
2020-03-14 15:54:46,774 80004 INFO ddos_test - Starting DDoS test with id trdwutsnwmkcvhdxibgv
2020-03-14 15:54:48,469 80004 INFO lib.account_session - Created account test-trdwutsnwmkcvhdxibgv with id cc3b71b4-5c1c-4e61-b9bf-8492872277ba
2020-03-14 15:54:51,365 80004 INFO ddos_test - Running test get_user with -n 2500 and -c 100, logging output to ./reports/ddos/2020-03-14T13:54:51.365339-get_user-n2500-c100.log
.
.
.
2020-03-14 16:19:58,532 80004 INFO ddos_test - Test get_comments done
2020-03-14 16:19:58,624 80004 INFO lib.account_session - Deleted account test-trdwutsnwmkcvhdxibgv with id cc3b71b4-5c1c-4e61-b9bf-8492872277ba
2020-03-14 16:19:58,624 80004 INFO ddos_test - Stopping DDoS test with id trdwutsnwmkcvhdxibgv
```

The cluster behaviour was being observed through the test. Here are some manually observed events related to pod scaling (`c` refers to concurrency count on the test):

```
15:56 get_user between c 100 and c 50 user-service 2 -> 3
16:00 get_image_data c 100 rest-api-service 2 -> 5 pods
16:02 get_image_data c 100 image-service 2 -> 4 pods
16:04 get_image_data c 100 image-service 4 -> 5 pods
16:11 get_image_data c 10 image-service 5 -> 3
16:14 get_image_meta c 50 image-service 3 -> 2
16:15 get_image_meta between c 50 and c 10 auth-service pods 2 -> 4
16:17 between get_comments c 100 and post_comments c 50 comment-service pods 2 -> 4
16:27 every service down at 2 pods except comment-service at 3
16:30 every service down at 2 pods
```

#### Measured values

The used Apache Benchmark tool gives certain set of metrics from the benchmark test. We present only some of them, but the meaning of the rest of them can be searched online. Our metrics are:

* **Concurrency (level)**: How many concurrent requests the `ad` tool should make
* **Req completed**: How many requests were completed
* **Total time (s)**: How long the benchmark took in time
* **Failed req**: How many requests failed for following reasons
  * Connect: Connection issue
  * Receive: Reciving issue
  * Length: Content length was different from **the first** request (this was the only observed failure case in our benchmarks)
  * Exceptions: Run-time exceptions (?)
* **Non-2xx responses**: Count of responses with status code starting with other than **2xx**
* **Req / s**: Requests per second
* **Mean time (ms) / req**: Mean time it took to complete a single request in milliseconds
* **Mean time (ms) / req (all concur. req.)**: Mean time it took to complete a request in milliseconds across all concurrent requests

#### Get user test

**Test name**: _get_user_

The stress test to `user-service` was rather simple GET request. As the results show, this API was the most unstable one with failure rate of 6,2% with 100 concurrent requests. This does, however, drop significantly when the concurrency drops (0,6% at concurrency of 10). From traditional JSON REST APIs included in this test, this API was also the slowest one with less than 50 requests per second on every concurrency levels. Also the average time to complete a request increases significantly when the concurrency increases: with concurrency of 10 avg response time is 304 ms, whereas with concurrency of 100 it's 2322 ms. It should be laso noted, that the test with concurrency of 100 was ran against two (2) pods, where as the two others were ran against three (3) `user-service` pods.

The reason for unstable and low performance API of `user-service` is probably both the language and immature nature of the implementation, as the project team had very low experience on Python (gRPC) APIs. Notably, the Python gRPC server is not spawning multiple threads for serving clients, which might increase the throughput significantly.

| Concurrency   | Req completed     | Time total (s)   | Failed req    | Non-2xx responses | Req / s | Mean time (ms) / req | Mean time (ms) / req (all concur. req.) |
|----|--|--|--|--|--|--|--|
| 100 | 2500 | 58 | 155 | 155 | 42.07 | 2321.916 | 23.219 |
| 50 | 2500 | 99 | 82 | 82 | 25.19 | 1985.276 | 39.706 |
| 10 | 2500 | 76 | 14 | 14 | 32.87 | 304.212 | 30.421 |

#### Get image data test

**Test name**: _get_image_data_

The stress test to `image-service` contained also only read operations. The first test was reading plain raw image byte data, which appeared to be the slowest test in the whole test suite. The average time to download an image appears to grow almost linearly when the concurrency grows. However, the test doesn't represent the realworld use-case scenario as the image data is being **cached** on the client side. This means, that we can practically asumme that a client won't request the same image more than once.

It's also immediately noticable that the request failure count is much less than with **get_user** test. We can see from [the detailed report](reports/ddos/2020-03-14T14:00:14.929098-get_image_data-n2500-c100.log) that the only four failed request were not failed due to status code, but different content length than during the first request. We don't know what caused this, but it doesn't strike us as a significant issue.

During the first round of getting image data (concurrency of 100), the `rest-api` scaled out from 2 pods to 5 and the `image-service` scaled from 2 to 4, which was very likely caused by the gRPC **streaming** API implementation. The image data was streamed with multiple messages from `image-service` to `rest-api`, which probably increased the CPU time significantly on both services. During the test with concurrency of 10 the `image-service` scaled back down to three (3) pods.

| Concurrency   | Req completed     | Time total (s)   | Failed req    | Non-2xx responses | Req / s | Mean time (ms) / req | Mean time (ms) / req (all concur. req.) |
|----|--|--|--|--|--|--|--|
| 100 | 2500 | 232 | 4 | 0 | 10.77 | 9284.659 | 92.847 |
| 50 | 2500 | 212 | 0 | 0 | 11.75 | 4255.195 | 85.104 |
| 10 | 2500 | 269 | 0 | 0 | 9.26 | 1079.701 | 107.970 |

#### Get image metadata test

**Test name**: _get_image_meta_

The image metadata test shows significant increase in the performance. It's easy to notice that the mean time to complete a request is up to 8,7 times faster (at concurrency of 50) than with the **get_user** test. The requests are rather similar in nature; both are getting a single entity from the database. The database setup might have also impact on this, since the `user-service` is having only one-pod PostgreSQL installation, whereas `image-service` has MongoDB cluster with three pods (primary, secondary and arbiter). It also looks like that the mean time to complete a request grows exponentially along with the concurrency level.

There wasn't major changes in pod replication during this test. Only `image-service` scaled down from three (3) to two (2) pods during the test with concurrency of 50. The interesting observation was that `auth-service` scaled up from two (2) to four (4) pods during the test with concurrency of 10. We have no idea what exactly caused this to happen.

| Concurrency   | Req completed     | Time total (s)   | Failed req    | Non-2xx responses | Req / s | Mean time (ms) / req | Mean time (ms) / req (all concur. req.) |
|----|--|--|--|--|--|--|--|
| 100 | 2500 | 14 | 11 | 0 | 178.49 | 560.240 | 5.602 |
| 50 | 2500 | 11 | 0 | 0 | 220.21 | 227.059 | 4.541 |
| 10 | 2500 | 24 | 0 | 0 | 105.73 | 94.581 | 9.458 |

#### Post comment test

**Test name:** _post_comment_

The comment posting test follows the same trends as **get_image_meta** test. The only exception is that the request time increases a little bit for every concurrency level (9,9%, 9,4% and 37,2%). It looks like the exponential growth when increasing concurrency is a bit more aggressive than with **get_image_meta** test, but it's probably due to the number of pods during the tests (explained below).

It should be noted that the **post_comment** and **get_comments** tests were ran as combined; first _post_comment_ with `c = 100`, then _get_comments_ with `c = 10`, then _post_comment_ with `c = 50` etc... The **comment-service** scaled up from two (2) pods to four (4) after the **get_comments** had been done with concurrency of 100. While it was surprising that it didn't happen during writing (post_comment), it should be also noted that the Horizontal Pod Autoscaler gets metrics from the metrics server, and isn't following the resources at every second. This obviously increases the possible bias within these tests.

Another thing that should be addressed when comparing the tests (targeting JSON APIs) against **comment-service** and **image-service** is that the **image-service** ran first with three (3) pods and then with 2 (2), whereas **comment-service** started "cold" with two (2) pods, and scaled up to four (4) just before the start of **post_comment** with concurrency of 50. The significant increase of throughput can be seen between the concurrency of 100 (with 2 pods) and 50 (with 4 pods) can be seen from the results below.

| Concurrency   | Req completed     | Time total (s)   | Failed req    | Non-2xx responses | Req / s | Mean time (ms) / req | Mean time (ms) / req (all concur. req.) |
|----|--|--|--|--|--|--|--|
| 100 | 2500 | 19 | 3 | 0 | 130.07 | 768.834 | 7.688 |
| 50 | 2500 | 12 | 0 | 0 | 201.29 | 248.402 | 4.968 |
| 10 | 2500 | 26 | 0 | 0 | 96.17 | 103.983 | 10.398 |

#### Get comments test

**Test name**: _get_comments_

The **get_comments** test was the only test where resources were read "in bulk" via paginated JSON API. This test follows the same trends as the **post_comment** test, mostly due to the fact that the number of **comment-service** pods were scaled up from two (2) to four (4) between the test with concurrency of 100 and 50. Overall the stable API (no failures) doesn't surprise, as the logic is rather simple and technology mature.

| Concurrency   | Req completed     | Time total (s)   | Failed req    | Non-2xx responses | Req / s | Mean time (ms) / req | Mean time (ms) / req (all concur. req.) |
|----|--|--|--|--|--|--|--|
| 100 | 2500 | 15 | 0 | 0 | 161.57 | 618.931 | 6.189 |
| 50 | 2500 | 15 | 0 | 0 | 168.41 | 296.887 | 5.938 |
| 10 | 2500 | 27 | 0 | 0 | 91.23 | 109.610 | 10.961 |


### Conclusions

The stress test against the services does bring in some interesting insights. The most notable thing was that **user-service**, being implemented with Python, was the worst-performing service. It should be also noted that **auth-service** and **rest-api**, being Node.js servers, weren't really under microscope here, so we can't really tell if Node.js is worse or better than Python in this context.

The general trend is clear: **comment-service** and **image-service**, being JVM application (Kotlin + Java), are performance-wise really good candidates for this kind of application. It would be interesting to extend this test further by observing the pods and cluster servers in detail, and see how much memory each pod consume during these test, and more specifically, does different runtimes (Python, Node.js and JVM) perform differently under certain stress scenarios.

The only weak spot of the services implemented on top of JVM was the image data API of **image-service**, which could probably be removed altogether if proper CDN system could be used. Then the **image-service** would be only storing the metadata + external URL for the image, and clients would use that URL for fetching the raw image. Also image sizes could be optimized both client-side (before posting it) and server-side (before storing it). As an example, brief investigations revealed that Instagram stores images at size of 750x738 (~90KB). This is significantly smaller than the image we used for the testing (~950KB). Also the gRPC streaming API could be optimized for certain image size by changing the chunk size.
