package com.instagram_clone.image_service.util

import org.apache.tika.detect.DefaultDetector
import org.apache.tika.metadata.Metadata
import java.io.InputStream

/**
 * Utility class for parsing documents.
 */
class DocumentParser {

  companion object {

    /**
     * Detect the document type (mime type).
     */
    fun detectDocumentType(stream: InputStream): String {
      val detector = DefaultDetector()
      val meta = Metadata()
      return detector.detect(stream, meta).toString()
    }
  }
}
