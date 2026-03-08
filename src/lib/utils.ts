import { Post } from "@/.velite";
import { clsx, type ClassValue } from "clsx";
import { slug } from "github-slugger";
import { twMerge } from "tailwind-merge";

/**
 * Merge multiple class values into a single, normalized class string with Tailwind class conflicts resolved.
 *
 * @param inputs - Class values (strings, arrays, objects, etc.) to combine
 * @returns A single string of merged, deduplicated CSS class names with Tailwind-specific conflicts resolved
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString(undefined, options);
};

export const sortPosts = (posts: Array<Post>) => {
  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
};

export const getAllTags = (posts: Array<Post>) => {
  const tags: Record<string, number> = {};

  posts.forEach((post) => {
    post.tags?.forEach((tag: string) => {
      tags[tag] = (tags[tag] ?? 0) + 1;
    });
  });

  return tags;
};

export function sortTagsByCount(tags: Record<string, number>) {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
}

/**
 * Finds posts that have a tag matching the provided slug.
 *
 * @param posts - The list of posts to search.
 * @param tag - The tag slug to match; each post tag is slugified before comparison.
 * @returns An array of posts whose slugified tags include `tag`.
 */
export function getPostsByTagSlug(posts: Array<Post>, tag: string) {
  return posts.filter((post) => {
    if (!post.tags) return false;
    const slugifiedTags = post.tags.map((t: string) => slug(t));
    return slugifiedTags.includes(tag);
  });
}

/**
 * Finds posts most related to a given post based on shared tags.
 *
 * @param currentPost - The reference post to find relations for
 * @param allPosts - The pool of posts to search
 * @param limit - Maximum number of related posts to return
 * @returns An array of up to `limit` published posts (excluding `currentPost`) ordered by count of shared tags, highest first
 */
export function getRelatedPosts(currentPost: Post, allPosts: Array<Post>, limit = 3) {
  const currentTags = currentPost.tags || [];
  return allPosts
    .filter((post) => post.slug !== currentPost.slug && post.published)
    .map((post) => ({
      post,
      matchCount: post.tags?.filter((tag) => currentTags.includes(tag)).length || 0,
    }))
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, limit)
    .map((r) => r.post);
}
