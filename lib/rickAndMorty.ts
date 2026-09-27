import type { CharacterResponse } from "@/types/character";

export const apiCall = async (page: number):Promise<CharacterResponse> => {
  const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)

  if (!response.ok) {
    throw new Error("Error al obtener los personajes")
  }

  const data: CharacterResponse = await response.json()

  return data
}
