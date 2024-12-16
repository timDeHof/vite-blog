import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Icons } from "./icons";
import { siteConfig } from "@/config/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='outline' className='w-10 px-0 sm:hidden'>
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='right'>
        <MobileLink
          onOpenChange={setOpen}
          to='/'
          className='flex items-center'
        >
          <Icons.logo className='mr-2 h-4 w-4' />
          <span className='font-bold'>{siteConfig.name}</span>
        </MobileLink>
        <div className='flex flex-col gap-3 mt-3'>
          <MobileLink onOpenChange={setOpen} to='/blog'>
            Blog
          </MobileLink>
          <MobileLink onOpenChange={setOpen} to='/about'>
            About
          </MobileLink>
          <a
            href={siteConfig.links.github}
            target='_blank'
            rel='noreferrer'
            className="text-foreground/60 transition-colors hover:text-primary"
          >
            GitHub
          </a>
          <a
            href={siteConfig.links.twitter}
            target='_blank'
            rel='noreferrer'
            className="text-foreground/60 transition-colors hover:text-primary"
          >
            Twitter
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps {
  to: string;
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileLink({
  to,
  onOpenChange,
  children,
  className,
  ...props
}: MobileLinkProps) {

  return (
    <Link
      to={to}
      onClick={() => {
        onOpenChange?.(false);
      }}
      className={cn(
        "[&.active]:text-foreground text-foreground/60 text-sm font-medium transition-colors hover:text-primary",
        className,
      )}

      {...props}
    >
      {children}
    </Link>
  );
}