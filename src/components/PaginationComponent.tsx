import type { IPaginationProps } from "@/interface/interface";
import { Pagination, PaginationContent, PaginationItem } from "./ui/pagination";
import { useMemo } from "react";
import { Button } from "./ui/button";

export const PaginationComponent = (props: IPaginationProps) => {
  const { maxPageNumber, currentPage, onPageChange } = props;
  const nextDisabled = useMemo(
    () => currentPage >= maxPageNumber,
    [currentPage, maxPageNumber]
  );
  const prevDisabled = useMemo(() => currentPage <= 1, [currentPage]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            disabled={prevDisabled}
            onClick={() => onPageChange(currentPage - 1)}
            className="cursor-pointer disabled:text-gray-400"
          >
            Previous
          </Button>
        </PaginationItem>
        {/* // cause responsive design issue fix later */}
        {/* {Array.from({ length: maxPageNumber }).map((_, index) => (
          <PaginationItem key={index} onClick={() => onPageChange(index + 1)}>
            <PaginationLink isActive={currentPage === index + 1}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))} */}
        <PaginationItem>
          <Button
            disabled={nextDisabled}
            onClick={() => onPageChange(currentPage + 1)}
            className="cursor-pointer disabled:text-gray-400"
          >
            Next
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
