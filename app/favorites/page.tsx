"use client";

import type { Character } from "@/types/character";
import { useFavorites } from "@/hooks/useFavorites";
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
      <h1 className="mt-2 w-full px-4 text-center text-2xl sm:text-3xl">
        My Favorite Characters
      </h1>

      {isLoading && (
        <p className="mt-8 text-white/70">Loading favorites...</p>
      )}
      {errors && <p className="mt-8 text-red-500">{errors}</p>}

      {!isLoading && !errors && characters.length === 0 && (
        <div className="mt-16 flex flex-col items-center px-4 text-center">
          <h2 className="mt-4 text-xl font-medium">No favorites yet</h2>
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
        <main className="grid w-full max-w-5xl grid-cols-1 gap-4 px-4 py-8 sm:grid-cols-2 sm:py-12 lg:grid-cols-3">
          {characters.map((character) => (
            <Link
              key={character.id}
              href={`/characters/${character.id}`}
              className="flex items-center justify-between gap-4 rounded-md border border-gray-300 p-4 shadow-sm transition-transform hover:scale-[1.01]"
            >
              <div className="min-w-0">
                <h2 className="text-lg font-medium break-words text-white/90">
                  {character.name}
                </h2>
                <p className="mt-2 text-sm text-white/80">
                  Status: {character.status}
                </p>
                <p className="mt-2 text-sm text-white/70">
                  Species: {character.species}
                </p>
                <p className="mt-2 text-sm break-words text-white/70">
                  Origin: {character.origin.name}
                </p>
              </div>

              <Image
                width={240}
                height={240}
                alt={character.name}
                src={character.image}
                className="size-16 shrink-0 rounded-full object-cover"
              />
            </Link>
          ))}
        </main>
      )}
    </div>
  );
};

export default FavoritesPage;