package com.instagram_clone.image_service.util

import org.junit.Test
import org.junit.runner.RunWith
import org.junit.runners.JUnit4
import org.junit.Assert.*


private const val PNG_IMAGE = "plot_sample.png"
private const val JPEG_IMAGE = "webcam-pic.jpeg"

@RunWith(JUnit4::class)
class DocumentParserUnitTest {

  @Test
  fun `test that it detects png images from disk`() {
    val stream = javaClass.classLoader.getResourceAsStream(PNG_IMAGE)
    val mimeType = DocumentParser.detectDocumentType(stream)

    assertEquals(mimeType, "image/png")
  }

  @Test
  fun `test that it detects jpeg images from disk`() {
    val stream = javaClass.classLoader.getResourceAsStream(JPEG_IMAGE)
    val mimeType = DocumentParser.detectDocumentType(stream)

    assertEquals(mimeType, "image/jpeg")
  }
}
