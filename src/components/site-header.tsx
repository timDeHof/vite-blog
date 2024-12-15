import { cn } from "../lib/utils";
import { siteConfig } from "../config/site";
import { Icons } from "./icons";
import { buttonVariants } from "./ui/button";
import { MainNav } from "./mainNav";
import { MobileNav } from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";

export const SiteHeader = () => {
  return (
    <header className='z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 max-w-screen-3xl items-center'>
        <MainNav />
        <div className='flex flex-1 items-center justify-end space-x-2'>
          <nav className='flex items-center'>
            <a
              href={siteConfig.links.github}
              target='_blank'
              rel='noreferrer'
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-10 px-0 hidden sm:inline-flex"
              )}
            >
              <Icons.gitHub className='h-4 w-4' />
              <span className='sr-only'>GitHub</span>
            </a>
            <a
              href={siteConfig.links.twitter}
              target='_blank'
              rel='noreferrer'
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-10 px-0 hidden sm:inline-flex"
              )}
            >
              <Icons.twitter className='h-4 w-4' />
              <span className='sr-only'>Twitter</span>
            </a>
            <ModeToggle />
            <MobileNav />
          </nav>
        </div>
      </div>
    </header>
  );
};