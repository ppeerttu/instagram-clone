FROM alpine:3.7

LABEL description="Database migration container for user-service"

ENV APP_DIR=/app
ENV DB_DIR=${APP_DIR}/db

# Install curl
RUN apk add --no-cache curl

# Install dbmate
RUN curl -fsSL -o /usr/local/bin/dbmate \
    https://github.com/amacneil/dbmate/releases/download/v1.7.0/dbmate-linux-musl-amd64 \
    && chmod +x /usr/local/bin/dbmate

# Working directory
WORKDIR ${APP_DIR}

RUN mkdir ${DB_DIR}

# Copy migrations into container
COPY ./migrations ${DB_DIR}/migrations

CMD [ "dbmate", "migrate" ]
