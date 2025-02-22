import { posts } from '@/.velite'
import { PostItem } from '@/components/post-item'
import { QueryPagination } from '@/components/query-pagination'
import { Tag } from '@/components/tag'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getAllTags, sortPosts, sortTagsByCount } from '@/lib/utils'
import { Helmet } from 'react-helmet-async'
import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import { BlogSkeleton } from '../../components/ui/blog-skeleton'

const POSTS_PER_PAGE = 5

interface BlogSearchParams {
  page?: string
}

const MDXContent = lazy(() => import('@/components/mdx-components'))

function BlogPage() {
  // Use search params for pagination
  const { page } = Route.useSearch()
  const currentPage = Number(page || '1')

  const sortedPosts = sortPosts(posts.filter((post) => post.published))
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage,
  )

  const tags = getAllTags(posts)
  const sortedTags = sortTagsByCount(tags)

  return (
		<>
			<Helmet>
				<title>Blog</title>
				<meta
					name='description'
					content='My ramblings on all things software engineering.'
				/>
			</Helmet>

			<div className='container max-w-4xl py-6 lg:py-10'>
				<div className='flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8'>
					<div className='flex-1 space-y-4'>
						<h1 className='inline-block font-black text-4xl lg:text-5xl'>
							Blog
						</h1>
						<p className='text-xl text-muted-foreground'>
							My ramblings on all things software engineering.
						</p>
					</div>
				</div>
				<div className='grid grid-cols-12 gap-3 mt-8'>
					<div className='col-span-12 col-start-1 sm:col-span-8'>
						<hr />
						{displayPosts?.length > 0 ? (
							<ul className='flex flex-col'>
								{displayPosts.map((post) => {
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
						) : (
							<p>Nothing to see here yet</p>
						)}
						<QueryPagination
							totalPages={totalPages}
							className='justify-end mt-4'
						/>
					</div>
					<Card className='col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1'>
						<CardHeader>
							<CardTitle>Tags</CardTitle>
						</CardHeader>
						<CardContent className='flex flex-wrap gap-2'>
							{sortedTags?.map((tag) => (
								<Tag tag={tag} key={tag} count={tags[tag]} />
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
}

export const Route = createFileRoute('/blog/')({
  component: BlogPage,
  validateSearch: (search: Record<string, string>): BlogSearchParams => {
    return {
      page: search.page ?? '1',
    }
  },
})

export default BlogPage

export const BlogPost = ({ slug }: { slug: string }) => {
  const post = posts.find(p => p.slug === slug);

  return (
    <Suspense fallback={<div className="container py-6"><BlogSkeleton /></div>}>
      <div className="container py-6">
        <MDXContent code={post.body} />
      </div>
    </Suspense>
  );
};
