import type { ReactNode } from "react";

interface PageContainerProps {
  title: string;
  children: ReactNode;
  searchBar?: ReactNode;
  error?: string | null;
  isLoading?: boolean;
  loadingMessage?: string;
  paginator?: ReactNode;
  emptyState?: ReactNode;
}

export const PagesContainer = ({
  title,
  children,
  searchBar,
  error,
  isLoading = false,
  loadingMessage = "Loading...",
  paginator,
  emptyState,
}: PageContainerProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mt-2 w-full px-4 text-center text-2xl sm:text-3xl">
        {title}
      </h1>

      {searchBar && (
        <div className="mt-6 w-full max-w-5xl px-4 sm:mt-8">{searchBar}</div>
      )}

      {error && <p className="mt-4 text-center text-red-500">{error}</p>}

      {isLoading && <p className="mt-4 text-center">{loadingMessage}</p>}

      {emptyState ?? children}

      {paginator}
    </div>
  );
};
