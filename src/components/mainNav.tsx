import { siteConfig } from "@/config/site";
import { Icons } from "./icons";
import { Link } from "@tanstack/react-router"

export const MainNav = () => {
  return (
    <>
      <nav className='flex items-center space-x-4 lg:space-x-6'>
        <Link
          to="/"
          className='[&.active]:font-bold mr-6 flex items-center space-x-2'

        >
          <Icons.logo className='h-6 w-6' />
          <span className='font-bold'>{siteConfig.name}</span>
        </Link>
        <Link
          to="/blog"
          className=
            '[&.active]:text-foreground text-foreground/60 text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block'

        >
          Blog
        </Link>
        <Link
          to="/about"
          className=
            '[&.active]:text-foreground text-foreground/60 text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block'>
          About
        </Link>
      </nav>
      <hr />
    </>
  )
}