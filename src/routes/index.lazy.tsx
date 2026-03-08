import { posts } from '#site/content'
import { PostItem } from '@/components/post-item'
import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { cn, sortPosts } from '@/lib/utils'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { Helmet } from 'react-helmet-async'

/**
 * Renders the home page with a hero section and a list of the four latest published posts.
 *
 * @returns The JSX element for the home page, including document head tags, hero controls, and the "Latest Posts" list.
 */
function Index() {
  const latestPosts = sortPosts(posts.filter((post) => post.published)).slice(0, 4)

  return (
    <>
      <Helmet>
        <title>Home - {siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
      </Helmet>

      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:mt-10 lg:py-32">
        <div className="container flex flex-col gap-4 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance">
            Hello, I'm Tim
          </h1>
          <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
            Exploring software development, personal growth, and engineering
          </p>
          <div className="flex flex-col gap-4 justify-center sm:flex-row">
            <Link
              to="/blog"
              search={{ page: '1' }}
              className={cn(buttonVariants({ size: 'lg' }), 'w-full sm:w-fit')}
            >
              View my blog
            </Link>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'w-full sm:w-fit',
              )}
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      <section className="container max-w-6xl py-6 lg:py-10 flex flex-col space-y-6 mt-60">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">
          Latest Posts
        </h2>
        <ul className="flex flex-col">
          {latestPosts.map((post) => (
            <li
              key={post.slug}
              className="first:border-t first:border-border"
            >
              <PostItem
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export const Route = createLazyFileRoute('/')({
  component: Index,
})

export default Index
