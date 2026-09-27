"use client";
import Image from "next/image";
import { Fragment } from "react";

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  handlePageChange: (page: number) => void;
}

export const Paginator = (props: PaginatorProps) => {
  const { currentPage, totalPages, isLoading, handlePageChange } = props;
  const previousDisabled = isLoading || currentPage <= 1;
  const nextDisabled = isLoading || currentPage >= totalPages;

  const calcInic = currentPage - 2 <= 0 ? 1 : currentPage - 2;
  const calcEnd = currentPage + 2 >= totalPages ? totalPages : currentPage + 2;
  const paginatorNumbers = new Set<number>([1, totalPages]);
  for (let i = calcInic; i <= calcEnd; i++) {
    paginatorNumbers.add(i);
  }
  const paginatorArraySorted = Array.from(paginatorNumbers).sort(
    (a, b) => a - b,
  );
  return (
    <section className="w-10/12 mx-auto my-10">
      <ul className="flex justify-center pl-0 list-none my-2">
        <li
          className={`text-white relative block mr-2.5 py-2 px-3 leading-tight rounded-xl ${previousDisabled ? "" : "hover:bg-gray-200/40 hover:text-black"}`}
        >
          <button
            className="page-link cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
            type="button"
            disabled={previousDisabled}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <Image
              src="/arrowLeft.svg"
              alt="Arrow Left"
              width={24}
              height={24}
              className="text-white"
            />
          </button>
        </li>
        {paginatorArraySorted.map((page, index) => {
          const previousPage = paginatorArraySorted[index - 1] ?? page;
          const showEllipsis = index > 0 && page - previousPage > 1;

          return (
            <Fragment key={page}>
              {showEllipsis && (
                <li aria-hidden="true" className="mr-2.5 py-2 px-3">
                  …
                </li>
              )}
              <li
                className={`relative block mr-2.5 py-2 px-3 leading-tight rounded-xl ${currentPage === page ? "bg-gray-200/90 text-black" : ""} ${isLoading ? "" : "hover:bg-gray-200/90 hover:text-black"}`}
              >
                <button
                  type="button"
                  className="page-link cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={isLoading}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              </li>
            </Fragment>
          );
        })}
        <li
          className={`text-white relative block mr-2.5 py-2 px-3 leading-tight rounded-xl ${nextDisabled ? "" : "hover:bg-gray-200/40 hover:text-black"}`}
        >
          <button
            className="page-link cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
            type="button"
            disabled={nextDisabled}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <Image
              src="/arrowRight.svg"
              alt="Arrow Right"
              width={24}
              height={24}
            />
          </button>
        </li>
      </ul>
    </section>
  );
};
