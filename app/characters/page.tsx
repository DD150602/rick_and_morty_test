"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { FavoriteButton } from "@/components/FaboriteButton";
import { Paginator } from "@/components/Paginator";
import { SearchBar } from "@/components/SearchBar";
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
    <div className="flex flex-col items-center justify-center">
      <h1 className="mt-2 w-full px-4 text-center text-2xl sm:text-3xl">
        Characters
      </h1>

      <div className="mt-6 w-full max-w-5xl px-4 sm:mt-8">
        <SearchBar
          placeholder="Search Character"
          onSearch={handleSearch}
        />
      </div>

      {error && (
        <p className="mt-4 text-center text-red-500">
          {error}
        </p>
      )}

      {isLoading && (
        <p className="mt-4 text-center">
          Loading...
        </p>
      )}

      {data && (
        <main className="grid w-full max-w-5xl grid-cols-1 gap-4 px-4 py-8 sm:grid-cols-2 sm:py-12 lg:grid-cols-3">
          {data.results.map((character) => (
            <Link
              key={character.id}
              href={`/characters/${character.id}`}
              className="rounded-md border border-gray-300 p-4 shadow-sm"
            >
              {/* Favorite button + image */}
              <div className="flex items-start justify-between gap-4">
                <FavoriteButton characterId={character.id} />

                <Image
                  loading="eager"
                  width={240}
                  height={240}
                  alt={character.name}
                  src={character.image}
                  className="size-16 shrink-0 rounded-full object-cover sm:size-18"
                />
              </div>

              {/* Character information */}
              <div className="mt-4">
                <h3 className="text-lg font-medium wrap-break-word text-white/90">
                  {character.name}
                </h3>

                <p className="mt-2 text-sm text-white/80">
                  Status: {character.status}
                </p>

                <p className="mt-2 text-sm text-white/70">
                  Species: {character.species}
                </p>

                <p className="mt-2 text-sm wrap-break-word text-white/70">
                  Origin: {character.origin.name}
                </p>

                <p className="mt-2 text-sm wrap-break-word text-white/70">
                  Location: {character.location.name}
                </p>
              </div>
            </Link>
          ))}
        </main>
      )}

      {data && (
        <Paginator
          totalPages={data.info.pages}
          currentPage={currentPage}
          isLoading={isLoading}
          handlePageChange={(page) =>
            loadPage(page, activeFilters)
          }
        />
      )}
    </div>
  );
}