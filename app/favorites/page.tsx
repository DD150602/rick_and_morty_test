"use client";

import { useFavorites } from "@/hooks/useFavorites";
import type { Character } from "@/types/character";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string | null>(null);

  const loadFavorites = useCallback(async () => {
    if (favorites.length === 0) {
      setCharacters([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${favorites.join(",")}`,
      );

      if (!response.ok) {
        throw new Error("Could not load favorite characters");
      }

      const data = await response.json();

      setCharacters(Array.isArray(data) ? data : [data]);
      setErrors(null);
    } catch (error) {
      setErrors(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  }, [favorites]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return (
    <div className="flex flex-col items-center font-sans">
      <h1 className="mt-2 text-3xl">My Favorite Characters</h1>
      {isLoading && (
        <p className="mt-8 text-white/70"> Loading favorites... </p>
      )}
      {errors && <p className="mt-8 text-red-500"> {errors} </p>}
      {!isLoading && !errors && characters.length === 0 && (
        <div className="mt-16 flex flex-col items-center text-center">
          <h2 className="mt-4 text-xl font-medium"> No favorites yet </h2>
          <p className="mt-2 text-sm text-white/60">
            Add some characters to your favorites and they will appear here.
          </p>
          <Link
            href="/characters"
            className="mt-6 rounded-md border border-white/20 px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            Browse characters
          </Link>
        </div>
      )}
      {!isLoading && !errors && characters.length > 0 && (
        <main className="grid w-full max-w-5xl grid-cols-2 gap-4 py-20 sm:items-start">
          {characters.map((character) => (
            <Link
              key={character.id}
              href={`/characters/${character.id}`}
              className="block rounded-md border border-gray-300 p-4 shadow-sm transition-transform hover:scale-[1.01] sm:p-6"
            >
              <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
                <div className="sm:order-last sm:shrink-0">
                  <Image
                    width={240}
                    height={240}
                    alt={character.name}
                    src={character.image}
                    className="size-16 rounded-full object-cover sm:size-18"
                  />
                </div>
                <div className="mt-4 sm:mt-0">
                  <h3 className="text-lg font-medium text-pretty text-white/90">
                    {character.name}
                  </h3>
                  <p className="mt-1 text-sm text-white/80">
                    Status: {character.status}
                  </p>
                  <p className="mt-4 line-clamp-2 text-sm text-pretty text-white/70">
                    Gender: {character.gender}, Species: {character.species},
                    Origin: {character.origin.name}, Location:
                    {character.location.name}
                  </p>
                </div>
              </div>
              <dl className="mt-6 flex gap-4 lg:gap-6">
                <div className="flex items-center gap-2">
                  <dt className="text-white/70">
                    <span className="sr-only">Created on</span>
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
                  <dd className="text-xs text-white/60">
                    {character.created.split("T")[0]}
                  </dd>
                </div>
                <div className="flex items-center gap-2">
                  <dt className="text-white/60">
                    <span className="sr-only">Type</span>
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
                        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 1 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                      />
                    </svg>
                  </dt>
                  <dd className="text-xs text-white/60">
                    {character.type || "Unknown"}
                  </dd>
                </div>
              </dl>
            </Link>
          ))}
        </main>
      )}
    </div>
  );
};

export default FavoritesPage;
