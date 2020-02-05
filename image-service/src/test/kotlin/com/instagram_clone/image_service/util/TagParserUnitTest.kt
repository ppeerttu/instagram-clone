package com.instagram_clone.image_service.util

import org.junit.Test
import org.junit.runner.RunWith
import org.junit.runners.JUnit4
import org.junit.Assert.*

@RunWith(JUnit4::class)
class TagParserUnitTest {

  @Test
  fun `test that hash tags are parsed properly`() {
    val simpleTags = listOf("foo", "bAr", "9999", "aa5")
    val simpleContent = simpleTags.joinToString(" ") { "#$it"}

    val simpleResult = TagParser.parseHashTags(simpleContent)
    assertEquals(simpleTags, simpleResult)

    val invalidTags = listOf("", "-", ".", "_", "!", "?", "#")
    val invalidContent = invalidTags.joinToString(" ") { "#$it" }

    val invalidResult = TagParser.parseHashTags(invalidContent)
    assertEquals(listOf<String>(), invalidResult)

    // Drop spaces as well
    val mixedContent = invalidTags.joinToString("") { "#$it"} + simpleTags.joinToString("") { "#$it"}
    val mixedResults = TagParser.parseHashTags(mixedContent)
    assertEquals(simpleTags, mixedResults)

    val exampleContent = "Feeling #cute might delete later \n\n#mondays\n#me"
    val expectedTags = listOf("cute", "mondays", "me")

    val exampleResult = TagParser.parseHashTags(exampleContent)
    assertEquals(expectedTags, exampleResult)
  }

  @Test
  fun `test that user tags are parsed properly`() {
    val simpleUsers = listOf("JohnDoe", "john123", "123", "john.doe", "_john_doe")
    val simpleContent = simpleUsers.joinToString(" ") { "@$it" }

    val simpleResults = TagParser.parseUserTags(simpleContent)
    assertEquals(simpleUsers, simpleResults)


    val invalidUsers = listOf("", "@@@", "----", "ab!", "ab", "ab?")
    val invalidContent = invalidUsers.joinToString(" ") { "@$it" }

    val invalidResult = TagParser.parseUserTags(invalidContent)
    assertEquals(listOf<String>(), invalidResult)

    // Drop spaces as well
    val mixedContent = invalidUsers.joinToString("") { "@$it" } + simpleUsers.joinToString("") { "@$it" }
    val mixedResults = TagParser.parseUserTags(mixedContent)
    assertEquals(simpleUsers, mixedResults)

    val exampleContent = "Having a blast with @johndoe1 and my good friend @St.Pat\n\n@jane_doe don't wait up"
    val expectedTags = listOf("johndoe1", "St.Pat", "jane_doe")

    val exampleResult = TagParser.parseUserTags(exampleContent)
    assertEquals(expectedTags, exampleResult)
  }
}
