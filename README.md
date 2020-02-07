# instagram-clone

Group project for Distributed Systems course at the University of Oulu.

## Group members

| Name                            | Student ID      | GitHub                                          |
|---------------------------------|-----------------|-------------------------------------------------|
| Perttu Kärnä                    | 2465119         | [ppeerttu](https://github.com/ppeerttu)         |
| Guanchen LI                     | 2627656         | [Ivan-Lee99](https://github.com/Ivan-Lee99)     |
| Juho Kantola                    | 2519793         | [knatola](https://github.com/knatola)           |
| Xin Shu                         | 2627520         | [Mr-Sushi](https://github.com/Mr-Sushi)         |

## Project description

This project is course work implementation for Distributed Systems course at the University of Oulu. The group members (and collaborators) are mentioned in [group members](#group-members) section.

This system is a naive clone of [Instagram](https://www.instagram.com/), containing mainly the backend functionality. We're not considering the client implementation in this project. The functionality that the system covers is as follows:

1. Create and manage account
2. Authentication and access control
3. Follow users
4. Post, read and delete images
5. Comment on images
6. Like images

The aim of the project is mainly within the field of distributed systems: to make scalable, fault tolerant, loosely coupled and highly available distributed system.

## System design

The system consists of isolated loosely coupled components called **services**. The workload of the system has been divided to the services based on logical functionality areas of the system: images, comments, users etc. The communication between the services happens with [gRPC][grpc-site], and service discovery happens via [Consul][consul-site], which can be considered as one of component as well. The system exposes one public HTTP REST API for clients - all gRPC APIs and communication is supposed to be private.

See the system architecture below.

![System architecture](docs/img/system_architecture.png)

The data of the system is being stored in the following way.

![Data model](docs/img/data_models.png)


[grpc-site]:https://grpc.io/
[consul-site]:https://www.consul.io/
