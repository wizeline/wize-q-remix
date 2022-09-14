import { useMemo } from 'react';

export const DOTS = '...';

const range = (start, end) => {
  const length = end - (start);
  return Array.from({ length }, (_, idx) => idx + start);
};

export function usePagination({
    currentPage,
    totalPages,
}) {
  const pagintationRange = useMemo(() => {
    const totalPageCount = totalPages;
    const sibilingCount = 1;
    const totalPageNumbers = 2 + sibilingCount;

    if (totalPageNumbers > totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - sibilingCount, 1);// 3
    const rigthSiblingIndex = Math.min(currentPage + sibilingCount, totalPageCount); // 5

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRigthDots = rigthSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;


    if (!shouldShowLeftDots && shouldShowRigthDots) {
      // eslint-disable-next-line no-mixed-operators
      const leftItemCount = 5 * sibilingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPageCount];
    } else if (shouldShowLeftDots && !shouldShowRigthDots) {
      // eslint-disable-next-line no-mixed-operators
      const rigthItemsCount = 5 * sibilingCount;
      // eslint-disable-next-line no-mixed-operators
      const rigthRange = range(totalPageCount - rigthItemsCount, totalPageCount + 1);
      return [firstPageIndex, DOTS, ...rigthRange];
    }

    const middleRange = range(leftSiblingIndex, rigthSiblingIndex + 1);
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }, [currentPage, totalPages]);
  return pagintationRange;
}