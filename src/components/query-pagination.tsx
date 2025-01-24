import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination"
import { Link } from "@tanstack/react-router"
import { Route as blogRoute } from "../routes/blog"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"

interface QueryPaginationProps {
  totalPages: number
  className?: string
}

export function QueryPagination({ totalPages, className }: QueryPaginationProps) {
  const search = blogRoute.useSearch()
  const currentPage = Number(search.page) || 1

  const prevPage = currentPage - 1
  const nextPage = currentPage + 1

  const createPageURL = (pageNumber: number) => ({
    search: { ...search, page: pageNumber.toString() }
  })

  return (
    <Pagination className={className}>
      <PaginationContent>
        {prevPage >= 1 && (
          <PaginationItem>
            <Link
              to="."
              {...createPageURL(prevPage)}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "gap-1 pl-2.5"
              )}
            >
              <span>Previous</span>
            </Link>
          </PaginationItem>
        )}
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem
            className="hidden sm:inline-block"
            key={`page-button-${index}`}
          >
            <Link
              to="."
              {...createPageURL(index + 1)}
              className={
                index + 1 === currentPage ? 'active-class' : 'inactive-class'
              }
            />
          </PaginationItem>
        ))}
        {nextPage <= totalPages && (
          <PaginationItem>
            <Link
              to="."
              {...createPageURL(nextPage)}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "gap-1 pr-2.5"
              )}
            >
              <span>Next</span>
            </Link>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}