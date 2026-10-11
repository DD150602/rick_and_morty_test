"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EpisodeFavoriteButton } from "@/components/EpisodeFavoriteButton";
import { useEpisodeFavorites } from "@/hooks/useEpisodeFavorites";
import { episodesByIds, type Episode } from "@/lib/episodes";

export default function FavoriteEpisodesPage() {
  const { favorites, isReady, isFavorite } = useEpisodeFavorites();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isReady) return;
    let cancelled = false;

    episodesByIds(favorites)
      .then((list) => {
        if (cancelled) return;
        setEpisodes(list);
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [favorites, isReady]);

  const visible = episodes.filter((episode) => isFavorite(episode.id));

  return (
    <div className="flex flex-col items-center font-sans">
      <h1 className="mt-2 w-full px-4 text-center text-2xl sm:text-3xl">
        My Favorite Episodes
      </h1>

      {(!isReady || isLoading) && (
        <p className="mt-8 text-white/70">Loading favorites...</p>
      )}
      {error && <p className="mt-8 text-red-500">{error}</p>}

      {isReady && !isLoading && !error && visible.length === 0 && (
        <div className="mt-16 flex flex-col items-center px-4 text-center">
          <h2 className="mt-4 text-xl font-medium">No favorites yet</h2>
          <p className="mt-2 text-sm text-white/60">
            Add some episodes to your favorites and they will appear here.
          </p>
          <Link
            href="/episodes"
            className="mt-6 rounded-md border border-white/20 px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            Browse episodes
          </Link>
        </div>
      )}

      {visible.length > 0 && (
        <main className="grid w-full max-w-5xl grid-cols-1 gap-4 px-4 py-8 sm:grid-cols-2 sm:py-12 lg:grid-cols-3">
          {visible.map((episode) => (
            <div
              key={episode.id}
              className="rounded-md border border-gray-300 p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-medium break-words text-white/90">
                  {episode.name}
                </h2>
                <EpisodeFavoriteButton episodeId={episode.id} className="shrink-0" />
              </div>

              <p className="mt-2 text-sm text-white/80">Episode: {episode.episode}</p>
              <p className="mt-2 text-sm text-white/70">Air date: {episode.air_date}</p>
            </div>
          ))}
        </main>
      )}
    </div>
  );
}