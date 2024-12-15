import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { SiteHeader } from "../components/site-header"
import { SiteFooter } from "../components/site-footer"

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 w-full flex flex-col sm:gap-4 sm:py-4">
        <Outlet />
      </main>
      <SiteFooter />
      <TanStackRouterDevtools />
    </div>
  ),
})