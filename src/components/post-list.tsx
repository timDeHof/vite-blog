import type { Post } from "@/.velite";
import { PostItem } from "@/components/post-item";

interface PostListProps {
  posts: Array<Post>;
}

/**
 * Renders a list of blog posts with a fallback for empty lists.
 */
export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return <p>Nothing to see here yet</p>;
  }

  return (
    <ul className="flex flex-col">
      {posts.map((post) => {
        const { slug, date, title, description, tags } = post;
        return (
          <li key={slug}>
            <PostItem
              slug={slug}
              date={date}
              title={title}
              description={description}
              tags={tags}
            />
          </li>
        );
      })}
    </ul>
  );
}