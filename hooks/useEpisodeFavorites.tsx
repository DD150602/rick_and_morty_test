import { useContext } from "react"
import { EpisodeFavoritesContext } from "@/context/EpisodeFavoritesContext"

export const useEpisodeFavorites = () => {
  const context = useContext(EpisodeFavoritesContext)

  if (!context) {
    throw new Error("useEpisodeFavorites debe usarse dentro de <EpisodeFavoritesProvider>")
  }

  return context
}