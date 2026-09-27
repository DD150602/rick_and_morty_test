import type { EpisodeResponse } from "@/types/episode";

export const episodeApiCall = async (): Promise<EpisodeResponse> => {
  const response = await fetch(
    "https://rickandmortyapi.com/api/episode"
  );

  if (!response.ok) {
    throw new Error("Error al obtener los episodios");
  }

  const data: EpisodeResponse = await response.json();

  return data;
};