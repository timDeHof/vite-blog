import { Post } from "@/.velite";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { slug } from "github-slugger";

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
    return dateA - dateB;
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
