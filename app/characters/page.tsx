"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import type { CharacterResponse } from "@/types/character";
import { Paginator } from "@/components/Paginator";
import { SearchBar } from "@/components/SearchBar";
import { apiCall } from "@/lib/rickAndMorty";

export default function CharactersPage() {
  const [data, setData] = useState<CharacterResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPage = useCallback(async (page: number) => {
    try {
      setIsLoading(true);
      const response = await apiCall(page);
      setCurrentPage(page);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPage(1);
  }, [loadPage]);

  return (
    <div className="flex flex-col items-center justify-center font-sans">
      <h1 className="text-3xl mt-2">Rick and Morty API wrapper</h1>
      <div className="mt-8 flex w-full max-w-5xl justify-end px-4">
        <SearchBar placeholder="Search Character" />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading && <p>Loading...</p>}
      {data && (
        <main className="grid grid-cols-2 w-full max-w-5xl items-center justify-between py-20 sm:items-start gap-4">
          {data.results.map((data) => (
            <a
              key={data.id}
              href="/characters"
              className="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6"
            >
              <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
                <div className="sm:order-last sm:shrink-0">
                  <Image
                    loading="eager"
                    width={240}
                    height={240}
                    alt="imamgen"
                    src={data.image}
                    className="size-16 rounded-full object-cover sm:size-18"
                  />
                </div>
                <div className="mt-4 sm:mt-0">
                  <h3 className="text-lg font-medium text-pretty text-white/90">
                    {data.name}
                  </h3>

                  <p className="mt-1 text-sm text-white/80">
                    status: {data.status}
                  </p>

                  <p className="mt-4 line-clamp-2 text-sm text-pretty text-white/70">
                    Gender: {data.gender}, Species: {data.species}, Origin:{" "}
                    {data.origin.name}, Location: {data.location.name}
                  </p>
                </div>
              </div>

              <dl className="mt-6 flex gap-4 lg:gap-6">
                <div className="flex items-center gap-2">
                  <dt className="text-white/70">
                    <span className="sr-only"> Published on </span>

                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                      />
                    </svg>
                  </dt>

                  <dd className="text-xs text-white/66">
                    {data.created.split("T")[0]}
                  </dd>
                </div>

                <div className="flex items-center gap-2">
                  <dt className="text-white/66">
                    <span className="sr-only"> Reading time </span>

                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                      />
                    </svg>
                  </dt>

                  <dd className="text-xs text-white/66">{data.type}</dd>
                </div>
              </dl>
            </a>
          ))}
        </main>
      )}
      {data && (
        <Paginator
          totalPages={data.info.pages}
          currentPage={currentPage}
          isLoading={isLoading}
          handlePageChange={loadPage}
        />
      )}
    </div>
  );
}
