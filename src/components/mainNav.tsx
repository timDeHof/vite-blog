import { siteConfig } from "@/config/site";
import { Link } from "@tanstack/react-router";
import { Icons } from "./icons";

export const primaryNav = [
  { title: "Blog", href: "/blog" },
  { title: "About", href: "/about" },
  { title: "Now", href: "/now" },
];

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
        {primaryNav.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className=
              '[&.active]:text-foreground text-foreground/60 text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block'
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <hr />
    </>
  )
}
