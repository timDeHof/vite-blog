import { createRootRoute, Outlet } from "@tanstack/react-router"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Suspense } from "react"
import React from "react"

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      )

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 w-full flex flex-col sm:gap-4 sm:py-4">
        <Outlet />
      </main>
      <SiteFooter />
<Suspense>
      <TanStackRouterDevtools />
</Suspense>
    </div>
  ),
})