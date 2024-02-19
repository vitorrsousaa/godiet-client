import {
  Pagination as PaginationUI,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@godiet-ui/Pagination';

import { usePagination } from '../hooks/usePagination';

interface PaginationProps {
  siblingsCount?: number;
  onPageChange: (page: number) => void;
  pageCount: number;
  currentPage: number;
}

export function Pagination(props: PaginationProps) {
  const { siblingsCount = 1, onPageChange, pageCount, currentPage } = props;

  const { previousPages, nextPages, lastPage } = usePagination(
    siblingsCount,
    currentPage,
    pageCount
  );

  return (
    <div className="space-x-2">
      <PaginationUI>
        {currentPage >= 1 + siblingsCount && (
          <>
            <PaginationItem onClick={() => onPageChange(0)}>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            {currentPage >= 2 + siblingsCount && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => {
            return (
              <PaginationItem key={page} onClick={() => onPageChange(page)}>
                <PaginationLink href="#">{page + 1}</PaginationLink>
              </PaginationItem>
            );
          })}

        <PaginationItem onClick={() => onPageChange(currentPage)}>
          <PaginationLink href="#" isActive>
            {currentPage + 1}
          </PaginationLink>
        </PaginationItem>

        {nextPages.length > 0 &&
          nextPages.map((page) => (
            <PaginationItem key={page} onClick={() => onPageChange(page)}>
              <PaginationLink href="#">{page + 1}</PaginationLink>
            </PaginationItem>
          ))}

        {currentPage + 1 + siblingsCount < lastPage && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem onClick={() => onPageChange(lastPage)}>
              <PaginationLink href="#">{lastPage + 1}</PaginationLink>
            </PaginationItem>
          </>
        )}
      </PaginationUI>
    </div>
  );
}
