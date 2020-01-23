FROM node:12-alpine

# Setup working directory
WORKDIR /app

# Install dependencies for bcrypt
RUN apk --no-cache add --virtual bcrypt-build-deps build-base python

# Copy package.json and related files
COPY package*.json ./

# Install dependencies on the container
RUN npm install --quiet
RUN npm rebuild bcrypt --build-from-source

# Delete build dependencies
RUN apk del bcrypt-build-deps

# Copy application files
COPY . .

# Compile to JavaScript
RUN npm run build

# Delete development dependencies
RUN npm prune --production

# Change file ownership to user node
RUN chown -R node: /app

# Run as user node
USER node
