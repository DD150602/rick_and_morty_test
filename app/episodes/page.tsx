"use client";
import { useCallback, useEffect, useState } from "react";
import { Paginator } from "@/components/Paginator";
import { EpisodeSearchBar } from "@/components/episodes/EpisodeSearchBar";
import { episodeApiCall, type EpisodeFilters } from "@/lib/episodes";
import type { EpisodeResponse } from "@/types/episode";
import { EpisodeCard } from "@/components/episodes/EpisodeCard";
import { MainContainer } from "@/components/MainContainer";
import { PagesContainer } from "@/components/PagesContainer";

const DEFAULT_FILTERS: EpisodeFilters = { name: "", episode: "" };

export default function EpisodesPage() {
  const [data, setData] = useState<EpisodeResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState(DEFAULT_FILTERS);

  const loadPage = useCallback(
    async (page: number, filters: EpisodeFilters) => {
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
    },
    [],
  );

  useEffect(() => {
    loadPage(1, DEFAULT_FILTERS);
  }, [loadPage]);

  const handleSearch = (filters: EpisodeFilters) => {
    setActiveFilters(filters);
    loadPage(1, filters);
  };

  return (
    <PagesContainer
      title="Episodes"
      searchBar={
        <EpisodeSearchBar
          placeholder="Search Episode"
          onSearch={handleSearch}
        />
      }
      error={error}
      isLoading={isLoading}
      paginator={
        data && (
          <Paginator
            totalPages={data.info.pages}
            currentPage={currentPage}
            isLoading={isLoading}
            handlePageChange={(page) => loadPage(page, activeFilters)}
          />
        )
      }
    >
      {data && (
        <MainContainer>
          {data.results.map((episode) => (
            <EpisodeCard
              key={episode.id}
              id={episode.id}
              air_date={episode.air_date}
              episode={episode.episode}
              name={episode.name}
            />
          ))}
        </MainContainer>
      )}
    </PagesContainer>
  );
}
