import { posts } from "../../.velite"
import { getPostsByTagSlug, getAllTags, sortTagsByCount } from "../../lib/utils"
import { PostItem } from "../../components/post-item"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { slug } from "github-slugger"
import { Tag } from "../../components/tag"
import { createFileRoute } from "@tanstack/react-router"
import { Helmet } from 'react-helmet-async'

function TagPage() {
  const { tag } = Route.useParams()
  const title = tag.split("-").join(" ")

  const allPosts = getPostsByTagSlug(posts, tag)
  const displayPosts = allPosts.filter((post) => post.published)
  const tags = getAllTags(posts)
  const sortedTags = sortTagsByCount(tags)

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`Posts on the topic of ${title}`} />
      </Helmet>

      <div className='container max-w-4xl py-6 lg:py-10'>
        <div className='flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8'>
          <div className='flex-1 space-y-4'>
            <h1 className='inline-block font-black text-4xl lg:text-5xl capitalize'>
              {title}
            </h1>
          </div>
        </div>
        <div className='grid grid-cols-12 gap-3 mt-8'>
          <div className='col-span-12 col-start-1 sm:col-span-8'>
            <hr />
            {displayPosts?.length > 0 ? (
              <ul className='flex flex-col'>
                {displayPosts.map((post) => {
                  const { slug, date, title, description, tags } = post
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
                  )
                })}
              </ul>
            ) : (
              <p>Nothing to see here yet</p>
            )}
          </div>
          <Card className='col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1'>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-wrap gap-2'>
              {sortedTags?.map((t) => (
                <Tag
                  tag={t}
                  key={t}
                  count={tags[t]}
                  current={slug(t) === tag}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export const Route = createFileRoute('/tags/$tag')({
  component: TagPage,
  loader: ({ params }) => {
    const tagExists = Object.keys(getAllTags(posts))
      .map(tag => slug(tag))
      .includes(params.tag)

    if (!tagExists) {
      throw new Error('Tag not found')
    }

    return null
  }
})

export default TagPage