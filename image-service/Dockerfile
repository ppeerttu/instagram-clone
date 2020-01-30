# Extend vert.x image
FROM vertx/vertx3

ENV VERTICLE_NAME com.instagram_clone.image_service.MainVerticle
ENV VERTICLE_FILE image-service-1.0.0-SNAPSHOT-fat.jar
ENV APP_DIR /app
ENV IMAGE_DATA_DIR ${APP_DIR}/image-data

# Set the location of the verticles
ENV VERTICLE_HOME ${APP_DIR}/target

COPY . ${APP_DIR}

RUN mkdir ${IMAGE_DATA_DIR}

WORKDIR ${VERTICLE_HOME}
# Launch the verticle
CMD ["sh", "-c", "java -jar $VERTICLE_FILE"]
