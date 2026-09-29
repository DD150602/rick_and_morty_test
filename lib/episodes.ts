import type { EpisodeResponse } from "@/types/episode";

export type EpisodeFilters = {
  name: string;
  episode: string;
};

export const episodeApiCall = async (
  page = 1,
  filters: EpisodeFilters = { name: "", episode: "" }
): Promise<EpisodeResponse> => {
  const params = new URLSearchParams({ page: String(page) });

  if (filters.name) params.set("name", filters.name);
  if (filters.episode) params.set("episode", filters.episode);

  const response = await fetch(
    `https://rickandmortyapi.com/api/episode?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Error al obtener los episodios");
  }

  const data: EpisodeResponse = await response.json();

  return data;
};