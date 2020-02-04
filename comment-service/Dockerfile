# Extend vert.x image
FROM vertx/vertx3

ENV VERTICLE_NAME com.instagram_clone.comment_service.verticle.MainVerticle
ENV VERTICLE_FILE comment-service-1.0.0-SNAPSHOT-fat.jar

# Set the location of the verticles
ENV VERTICLE_HOME /app/target

EXPOSE 3001

COPY . /app

# Launch the verticle
WORKDIR /app/target
ENTRYPOINT ["sh", "-c", "java -jar $VERTICLE_FILE"]
