/* eslint-disable indent */

import { useCallback, useMemo } from 'react';

export function usePagination(
  siblingsCount: number,
  currentPage: number,
  pageCount: number
) {
  const lastPage = pageCount - 1;

  const generatePagesArray = useCallback((from: number, to: number) => {
    return [...new Array(to - from)].map((_, index) => {
      return from + index + 1;
    });
  }, []);

  const previousPages = useMemo(
    () =>
      currentPage > 0
        ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
        : [],
    [currentPage, generatePagesArray, siblingsCount]
  );

  const nextPages = useMemo(
    () =>
      currentPage < lastPage
        ? generatePagesArray(
            currentPage,
            Math.min(currentPage + siblingsCount, lastPage)
          )
        : [],
    [currentPage, generatePagesArray, lastPage, siblingsCount]
  );

  return {
    previousPages,
    nextPages,
    lastPage,
  };
}
