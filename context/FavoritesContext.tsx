"use client"

import { createContext, useState } from "react"

interface FavoriteContext {
  favorites: number[]
  addFavorite: (id: number) => void
  removeFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
}

interface Props {
  children: React.ReactNode;
}

export const FavoritesContext = createContext<FavoriteContext | null>(null)

export const FavoritesProvider = (props: Props) => {
  const [favorites, setFavorites] = useState<number[]>([])
  
  const addFavorite = (id: number) => {
    setFavorites(prevState => [...prevState, id])
  }

  const removeFavorite = (id: number) => {
    setFavorites(prevState => prevState.filter(favoriteId => favoriteId !== id))
  }

  const isFavorite = (id: number) => favorites.includes(id)

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite
      }}
    >
      {props.children}
    </FavoritesContext.Provider>
  )
}