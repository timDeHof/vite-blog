import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { siteConfig } from '../config/site'
import { createFileRoute } from '@tanstack/react-router'
import { Helmet } from 'react-helmet-async'

function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Me</title>
        <meta name="description" content="Information about me" />
      </Helmet>

      <div className="container max-w-6xl py-6 lg:py-10">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-x-4">
            <h1 className="inline-block font-black text-4xl lg:text-5xl">
              About Me
            </h1>
          </div>
        </div>
        <hr className="my-8" />
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="min-w-48 max-w-48 flex flex-col gap-2">
            <Avatar className="h-48 w-48">
              <AvatarImage src="/avatar-tim.png" alt={siteConfig.author} />
              <AvatarFallback>TD</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold text-center break-words">
              {siteConfig.author}
            </h2>
            <p className="text-muted-foreground text-center break-words">
              Software Developer
            </p>
          </div>
          <p className="text-muted-foreground text-lg py-4">
            As a full-stack developer, I have a passion for creating dynamic and
            responsive websites. I am a self-taught developer with a strong
            background in both frontend and backend development.
          </p>
        </div>
      </div>
    </>
  )
}

// Define the route
export const Route = createFileRoute('/about')({
  component: AboutPage,
})

export default AboutPage
