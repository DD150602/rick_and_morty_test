import type { EpisodeResponse } from "@/types/episode";

export type EpisodeFilters = {
  name: string;
  episode: string;
};

export type Episode = EpisodeResponse["results"][number];

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

export const episodesByIds = async (ids: number[]): Promise<Episode[]> => {
  if (ids.length === 0) return [];

  const response = await fetch(
    `https://rickandmortyapi.com/api/episode/${ids.join(",")}`
  );

  if (!response.ok) {
    throw new Error("Error al obtener los episodios favoritos");
  }

  // Con un solo id la API devuelve un objeto, con varios un arreglo
  const data: Episode | Episode[] = await response.json();

  return Array.isArray(data) ? data : [data];
};