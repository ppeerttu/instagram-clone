FROM python:3.7-alpine as base

# Create builder image
FROM base as builder

ENV APP_USER=app-user

RUN adduser -D ${APP_USER}
WORKDIR /home/${APP_USER}

# Install dependencies so that Python requirements can be installed
RUN apk add --no-cache \
    gcc \
    g++  \
    make \
    linux-headers \
    musl-dev \
    python3-dev \
    libc6-compat \
    postgresql-libs \
    postgresql-dev

# Create a virtual environment for Python
RUN python -m venv env

# Install dependencies
COPY requirements.txt ./
RUN env/bin/pip install -r requirements.txt

# Create app image
FROM base

# Run the app as non-root user
ENV APP_USER=app-user
RUN adduser -D ${APP_USER}
WORKDIR /home/${APP_USER}

# Install required run-time dependencies
RUN apk add --no-cache \
    g++ \
    postgresql-libs

# Copy and assign all required python files
COPY --chown=${APP_USER}:${APP_USER} --from=builder /home/${APP_USER}/env env/
COPY --chown=${APP_USER}:${APP_USER} ./app ./app
COPY --chown=${APP_USER}:${APP_USER} server.py ./

# Switch user
USER ${APP_USER}

CMD [ "env/bin/python", "-u", "server.py" ]
