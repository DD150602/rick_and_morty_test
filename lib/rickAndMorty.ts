import type { CharacterResponse } from "@/types/character";

export const apiCall = async ():Promise<CharacterResponse> => {
  const response = await fetch("https://rickandmortyapi.com/api/character")

  if (!response.ok) {
    throw new Error("Error al obtener los personajes")
  }

  const data: CharacterResponse = await response.json()

  return data
}
