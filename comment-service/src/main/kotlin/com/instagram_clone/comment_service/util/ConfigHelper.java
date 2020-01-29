package com.instagram_clone.comment_service.util;

import io.vertx.config.ConfigRetriever;
import io.vertx.core.Future;
import io.vertx.core.Promise;
import io.vertx.core.json.JsonObject;

public class ConfigHelper {

  public static Future<JsonObject> getConfig(ConfigRetriever retriever) {
    Promise<JsonObject> promise = Promise.promise();
    retriever.getConfig((ar) -> {
      if (ar.succeeded()) {
        promise.complete(ar.result());
      } else {
        promise.fail(ar.cause());
      }
    });
    return promise.future();
  }
}
