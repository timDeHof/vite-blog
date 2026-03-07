import { posts } from "#site/content"; // Adjust this import path based on your project structure
import CoverImage from "@/components/cover-image";
import { MDXContent } from "@/components/mdx-components"; // Adjust component import
import { Tag } from "@/components/tag";
import { siteConfig } from "@/config/site";
import { formatDate, getRelatedPosts } from "@/lib/utils";
import "@/styles/mdx.css";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
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
    const relatedPosts = getRelatedPosts(post, posts, 3);
    return { post, relatedPosts };
  },
});

function BlogPost() {
  const navigate = useNavigate();
  const data = Route.useLoaderData() as { post: typeof posts[0]; relatedPosts: typeof posts } | null;

  useEffect(() => {
    if (!data) {
      navigate({ to: '/blog', search: {page: '1'} });
      return;
    }
  }, [data, navigate]);

  if (!data) {
    return null;
  }

  const { post, relatedPosts } = data;

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);
  const ogImageUrl = `/api/og?${ogSearchParams.toString()}`;

  return (
		<>
			<Helmet>
				<title>{`${post.title} - ${siteConfig.name}`}</title>
				<meta name='description' content={post.description || ""} />
				<meta property='og:title' content={post.title} />
				<meta property='og:description' content={post.description || ""} />
				<meta property='og:url' content={post.slug} />
				<meta property='og:image' content={ogImageUrl} />
				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:title' content={post.title} />
				<meta name='twitter:description' content={post.description || ""} />
				<meta name='twitter:image' content={ogImageUrl} />
			</Helmet>

			<div className='container max-w-6xl py-6'>
				<div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
					<article className='lg:col-span-3 prose dark:prose-invert'>
						{post.cover && <CoverImage src={post.cover.src} alt={post.title} />}
						<h1 className='mb-2'>{post.title}</h1>
						<div className='flex gap-2 mb-2'>
							{post.tags?.map((tag: string) => <Tag key={tag} tag={tag} />)}
						</div>
						{post.description && (
							<p className='text-xl mt-0 text-muted-foreground'>
								{post.description}
							</p>
						)}
						<hr className='my-4' />
						<MDXContent code={post.body} />
					</article>
					<aside className='hidden lg:block lg:col-span-1'>
						<div className='sticky top-20 space-y-6'>
							<div>
								<h3 className='font-semibold text-lg mb-3'>Related Posts</h3>
								<ul className='space-y-3'>
									{relatedPosts.map((relatedPost) => (
										<li key={relatedPost.slug}>
											<Link
												to='/blog/$slug'
												params={{ slug: relatedPost.slugAsParams || relatedPost.slug.split('/').pop() || '' }}
												className='block group'
											>
												<span className='font-medium group-hover:text-primary transition-colors line-clamp-2'>
													{relatedPost.title}
												</span>
												<time className='text-sm text-muted-foreground'>
													{formatDate(relatedPost.date)}
												</time>
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
					</aside>
				</div>
			</div>
		</>
	);
}

export default BlogPost;
