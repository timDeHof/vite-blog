import { sortPosts, cn } from './lib/utils'
import { siteConfig } from './config/site'
import { buttonVariants } from './components/ui/button'
import { PostItem } from './components/post-item'
import { posts } from './.velite'
import { Link } from "@tanstack/react-router"
import './globals.css'



function App() {
  const latestPosts = sortPosts(posts).slice(0, 4)

  return (
    <>
      <section className='space-y-6 pb-8 pt-6 md:pb-12 md:mt-10 lg:py-32'>
        <div className='container flex flex-col gap-4 text-center'>
          <h1 className='text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance'>
            Hello, I&apos;m Tim
          </h1>
          <p className='max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance'>
            Welcome to my blog. Built using tailwind, shadcn, velite and Nextjs
            14.
          </p>
          <div className='flex flex-col gap-4 justify-center sm:flex-row'>
            <Link
              to='/blog'
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}>
              View my blog
            </Link>
            <Link
              to={siteConfig.links.github}
              target='_blank'
              rel='noreferrer'
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full sm:w-fit",
              )}>
              GitHub
            </Link>
          </div>
        </div>
      </section>

      <section className='container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6 mt-60'>
        <h2 className='text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center'>
          Latest Posts
        </h2>
        <ul className='flex flex-col'>
          {latestPosts.map(
            (post) =>
              post.published && (
                <li
                  key={post.slug}
                  className='first:border-t first:border-border'>
                  <PostItem
                    slug={post.slug}
                    title={post.title}
                    description={post.description}
                    date={post.date}
                    tags={post.tags}
                  />
                </li>
              ),
          )}
        </ul>
      </section>
    </>
  )
}

export default App
