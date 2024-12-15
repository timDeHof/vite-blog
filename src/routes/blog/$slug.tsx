import { posts } from "../../.velite";  // Adjust this import path based on your project structure
import { MDXContent } from "../../components/mdx-components"; // Adjust component import
import "../../styles/mdx.css";
import { siteConfig } from "../../config/site";
import { Tag } from "../../components/tag";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Helmet } from 'react-helmet-async';

// Define the route with params
export const Route = createFileRoute('/blog/$slug')({
  component: BlogPost,
  loader: ({ params }) => {
    const post = posts.find((post) => post.slugAsParams === params.slug);
    if (!post || !post.published) {
      return null;
    }
    return post;
  },
});

function BlogPost() {
  const navigate = useNavigate();
  const post = Route.useLoaderData();

  useEffect(() => {
    if (!post) {
      navigate({ to: '/blog', search: {page: '1'} });
      return;
    }
  }, [post, navigate]);

  if (!post) {
    return null;
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);
  const ogImageUrl = `/api/og?${ogSearchParams.toString()}`;

  return (
    <>
      <Helmet>
        <title>{`${post.title} - ${siteConfig.name}`}</title>
        <meta name="description" content={post.description || ''} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description || ''} />
        <meta property="og:url" content={post.slug} />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description || ''} />
        <meta name="twitter:image" content={ogImageUrl} />
      </Helmet>

      <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
        <h1 className="mb-2">{post.title}</h1>
        <div className="flex gap-2 mb-2">
          {post.tags?.map((tag: string) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
        {post.description && (
          <p className="text-xl mt-0 text-muted-foreground">
            {post.description}
          </p>
        )}
        <hr className="my-4" />
        <MDXContent code={post.body} />
      </article>
    </>
  );
}

export default BlogPost;