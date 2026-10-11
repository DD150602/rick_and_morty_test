"use client";

import { useCallback, useEffect, useState } from "react";
import { CharacterCard } from "@/components/characters/CharacterCard";
import { SearchBar } from "@/components/characters/SearchBar";
import { MainContainer } from "@/components/MainContainer";
import { PagesContainer } from "@/components/PagesContainer";
import { Paginator } from "@/components/Paginator";
import { apiCall, type CharacterFilters } from "@/lib/rickAndMorty";
import type { CharacterResponse } from "@/types/character";

const DEFAULT_FILTERS: CharacterFilters = {
  name: "",
  status: "",
  gender: "",
};

export default function CharactersPage() {
  const [data, setData] = useState<CharacterResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] =
    useState<CharacterFilters>(DEFAULT_FILTERS);

  const loadPage = useCallback(
    async (page: number, filters: CharacterFilters) => {
      try {
        setIsLoading(true);

        const response = await apiCall(page, filters);

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

  const handleSearch = (filters: CharacterFilters) => {
    setActiveFilters(filters);
    loadPage(1, filters);
  };

  return (
    <PagesContainer
      title="Characters"
      searchBar={
        <SearchBar placeholder="Search Character" onSearch={handleSearch} />
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
          {data.results.map((character) => (
            <CharacterCard
              key={character.id}
              id={character.id}
              name={character.name}
              image={character.image}
              location={character.location}
              origin={character.origin}
              species={character.species}
              status={character.status}
            />
          ))}
        </MainContainer>
      )}
    </PagesContainer>
  );
}
