"use client";
import { useCallback, useEffect, useState } from "react";
import { Paginator } from "@/components/Paginator";
import { EpisodeSearchBar } from "@/components/EpisodeSearchBar";
import { episodeApiCall, type EpisodeFilters } from "@/lib/episodes";
import type { EpisodeResponse } from "@/types/episode";

const DEFAULT_FILTERS: EpisodeFilters = { name: "", episode: "" };

export default function EpisodesPage() {
  const [data, setData] = useState<EpisodeResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState(DEFAULT_FILTERS);

  const loadPage = useCallback(async (page: number, filters: EpisodeFilters) => {
    try {
      setIsLoading(true);
      const response = await episodeApiCall(page, filters);
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
    loadPage(1, DEFAULT_FILTERS);
  }, [loadPage]);

  const handleSearch = (filters: EpisodeFilters) => {
    setActiveFilters(filters);
    loadPage(1, filters);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mt-2 text-2xl sm:text-3xl">Episodes</h1>

      <div className="mt-6 w-full max-w-5xl px-4 sm:mt-8">
        <EpisodeSearchBar placeholder="Search Episode" onSearch={handleSearch} />
      </div>

      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      {isLoading && <p className="mt-4 text-center">Loading...</p>}

      {data && (
        <main className="grid w-full max-w-5xl grid-cols-1 gap-4 px-4 py-8 sm:grid-cols-2 sm:py-12 lg:grid-cols-3">
          {data.results.map((episode) => (
            <div
              key={episode.id}
              className="block rounded-md border border-gray-300 p-4 shadow-sm"
            >
              <h2 className="text-lg font-medium break-words text-white/90">
                {episode.name}
              </h2>

              <p className="mt-2 text-sm text-white/80">
                Episode: {episode.episode}
              </p>

              <p className="mt-2 text-sm text-white/70">
                Air date: {episode.air_date}
              </p>
            </div>
          ))}
        </main>
      )}

      {data && (
        <Paginator
          totalPages={data.info.pages}
          currentPage={currentPage}
          isLoading={isLoading}
          handlePageChange={(page) => loadPage(page, activeFilters)}
        />
      )}
    </div>
  );
}