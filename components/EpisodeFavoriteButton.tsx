"use client"

import { useEpisodeFavorites } from "@/hooks/useEpisodeFavorites"

interface Props {
  episodeId: number
  className?: string
}

export const EpisodeFavoriteButton = ({ episodeId, className = "" }: Props) => {
  const { isFavorite, addFavorite, removeFavorite } = useEpisodeFavorites()
  const active = isFavorite(episodeId)

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      onClick={() => (active ? removeFavorite(episodeId) : addFavorite(episodeId))}
      className={`cursor-pointer rounded-lg border border-white/20 px-3 py-1 text-sm hover:border-cyan-300 ${
        active ? "bg-cyan-300 text-slate-950" : "text-white/80"
      } ${className}`}
    >
      {active ? "★" : "☆"}
    </button>
  )
}