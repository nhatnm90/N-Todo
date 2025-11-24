import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination.tsx'
import { cn } from '@/lib/utils.ts'

type PagingProps = {
  currentPage: number
  totalPages: number
  handleNextPage: any
  handlePrevPage: any
  handlePageChange: any
}

const Paging = ({ currentPage, totalPages, handleNextPage, handlePrevPage, handlePageChange }: PagingProps) => {
  const generatePages = () => {
    let pages = []
    if (totalPages < 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        if ([1, totalPages].includes(i) || Math.abs(i - currentPage) <= 1) {
          pages.push(i)
        } else {
          if (pages[pages.length - 1] === -1) continue
          else pages.push(-1)
        }
      }
    }
    return pages
  }

  return (
    <div className='flex justify-center mt-4'>
      <Pagination>
        <PaginationContent>
          {/* Previous page */}
          <PaginationItem className={cn('cursor-pointer', currentPage === 1 ? 'text-muted-foreground' : '')}>
            <PaginationPrevious onClick={handlePrevPage} />
          </PaginationItem>
          {generatePages().map((page, index) => {
            if (page === -1) {
              return (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            } else {
              return (
                <PaginationItem>
                  <PaginationLink
                    className='cursor-pointer'
                    isActive={page === currentPage}
                    onClick={() => {
                      if (page !== currentPage) {
                        handlePageChange(page)
                      }
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            }
          })}
          {/* Next Page */}
          <PaginationItem className={cn('cursor-pointer', currentPage === totalPages ? 'text-muted-foreground' : '')}>
            <PaginationNext onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default Paging
