import { ImageMeta } from "./image";

/**
 * Generic page content shape.
 */
export interface Page<T> {

    /**
     * Page size
     */
    size: number;

    /**
     * Page number
     */
    page: number;

    /**
     * Count of content in this page
     */
    count: number;

    /**
     * Total count of content
     */
    totalCount: number;

    /**
     * The actual content
     */
    content: T[];
}

export type TagType = "user-tag" | "hash-tag";

export interface ImageSearchPageWrapper extends Page<ImageMeta> {

    /**
     * The search string
     */
    searchTag: string;

    /**
     * Tag type, either user tag (@username) or hash tag (#hashtag)
     */
    tagType: TagType;
}
