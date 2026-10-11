"use client"

import { createContext, useEffect, useState } from "react"

const STORAGE_KEY = "favorites:episodes"

interface EpisodeFavoriteContext {
  favorites: number[]
  isReady: boolean
  addFavorite: (id: number) => void
  removeFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
}

interface Props {
  children: React.ReactNode
}

export const EpisodeFavoritesContext = createContext<EpisodeFavoriteContext | null>(null)

export const EpisodeFavoritesProvider = (props: Props) => {
  const [favorites, setFavorites] = useState<number[]>([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const parsed = stored ? JSON.parse(stored) : []
      setFavorites(Array.isArray(parsed) ? parsed : [])
    } catch {
      setFavorites([])
    }
    setIsReady(true)
  }, [])

  useEffect(() => {
    if (!isReady) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites, isReady])

  const addFavorite = (id: number) => {
    setFavorites(prevState => (prevState.includes(id) ? prevState : [...prevState, id]))
  }

  const removeFavorite = (id: number) => {
    setFavorites(prevState => prevState.filter(favoriteId => favoriteId !== id))
  }

  const isFavorite = (id: number) => favorites.includes(id)

  return (
    <EpisodeFavoritesContext.Provider
      value={{ favorites, isReady, addFavorite, removeFavorite, isFavorite }}
    >
      {props.children}
    </EpisodeFavoritesContext.Provider>
  )
}