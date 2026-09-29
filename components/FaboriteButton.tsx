"use client";
import { useFavorites } from "@/hooks/useFavorites";

type FavoriteButtonProps = { characterId: number };

export function FavoriteButton({ characterId }: FavoriteButtonProps) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.includes(characterId);
  const handleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (isFavorite) {
      removeFavorite(characterId);
    } else {
      addFavorite(characterId);
    }
  };
  return (
    <button
      type="button"
      onClick={handleFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className="rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-yellow-400"
    >
      
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill={isFavorite ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6"
      >
        
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.562.562 0 0 0 .475.344l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.562.562 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.85a.562.562 0 0 0-.58 0l-4.725 2.85a.562.562 0 0 1-.84-.61l1.285-5.385a.562.562 0 0 0-.182-.557L2.77 10.384c-.38-.325-.178-.948.321-.988l5.518-.442a.562.562 0 0 0 .475-.344L11.48 3.5Z"
        />
      </svg>
    </button>
  );
}
