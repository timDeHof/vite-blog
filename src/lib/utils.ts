import { Post } from "@/.velite";
import { clsx, type ClassValue } from "clsx";
import { slug } from "github-slugger";
import { twMerge } from "tailwind-merge";

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

export function getPostsByTagSlug(posts: Array<Post>, tag: string) {
  return posts.filter((post) => {
    if (!post.tags) return false;
    const slugifiedTags = post.tags.map((tag: string) => slug(tag));
    return slugifiedTags.includes(tag);
  });
}

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
