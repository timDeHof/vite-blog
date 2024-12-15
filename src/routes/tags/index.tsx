import { posts } from '../../.velite'
import { getAllTags, sortTagsByCount } from '../../lib/utils'
import { Tag } from '../../components/tag'
import { createFileRoute } from '@tanstack/react-router'
import { Helmet } from 'react-helmet-async'

function TagsPage() {
  const tags = getAllTags(posts)
  const sortedTags = sortTagsByCount(tags)

  return (
    <>
      <Helmet>
        <title>Tags</title>
        <meta name="description" content="Topics I've written about" />
      </Helmet>

      <div className="container max-w-4xl py-6 lg:py-10">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block font-black text-4xl lg:text-5xl">
              Tags
            </h1>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex flex-wrap gap-3">
          {sortedTags.map((t) => (
            <Tag key={t} tag={t} count={tags[t]} />
          ))}
        </div>
      </div>
    </>
  )
}

export const Route = createFileRoute('/tags/')({
  component: TagsPage,
})

export default TagsPage
