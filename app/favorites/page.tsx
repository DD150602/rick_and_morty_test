"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { CharacterCard } from "@/components/characters/CharacterCard";
import { MainContainer } from "@/components/MainContainer";
import { PagesContainer } from "@/components/PagesContainer";
import { useFavorites } from "@/hooks/useFavorites";
import type { Character } from "@/types/character";

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
    <PagesContainer
      title="My Favorite Characters"
      isLoading={isLoading}
      loadingMessage="Loading favorites..."
      error={errors}
      emptyState={
        !isLoading && !errors && characters.length === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center">
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
        ) : undefined
      }
    >
      {!isLoading && !errors && characters.length > 0 && (
        <MainContainer>
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              id={character.id}
              image={character.image}
              location={character.location}
              name={character.name}
              origin={character.origin}
              species={character.species}
              status={character.status}
            />
          ))}
        </MainContainer>
      )}
    </PagesContainer>
  );
};

export default FavoritesPage;
