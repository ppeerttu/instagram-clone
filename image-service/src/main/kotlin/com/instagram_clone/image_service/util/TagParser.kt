package com.instagram_clone.image_service.util

// Group matches starting with #, allow alphabets and digits, at least 2 and at most 30
private const val HASH_TAG_REGEX = "(#[a-zA-Z\\d]{2,30})"
// Group matches starting with @, allow alphabets, digits, underscores and periods, at
// least 3 and at most 30
private const val USER_TAG_REGEX = "(@[a-zA-Z\\d_.]{3,30})"

/**
 * Utility class for parsing tags out of textual content.
 */
class TagParser {

  companion object {

    /**
     * Parse tags with given [pattern] from textual [content].
     */
    private fun parseTags(pattern: String, content: String): List<String> {
      val tags = mutableListOf<String>()
      Regex(pattern)
        .findAll(content)
        .forEach {
          tags.add(it.value.removeRange(0, 1))
        }
      return tags.toList()
    }

    /**
     * Parse hash tags from given [content]. The returned list will contain
     * parsed tags without the preceding "#" -character.
     */
    fun parseHashTags(content: String) = parseTags(HASH_TAG_REGEX, content)

    /**
     * Parse user tags from given [content]. The returned list will contain
     * parsed tags without the preceding the "@" -character.
     */
    fun parseUserTags(content: String) = parseTags(USER_TAG_REGEX, content)
  }
}
