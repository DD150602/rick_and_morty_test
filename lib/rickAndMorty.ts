import type { CharacterResponse } from "@/types/character";

export interface CharacterFilters {
  name: string;
  status: string;
  gender: string;
}

export const apiCall = async (
  page: number,
  filters: CharacterFilters,
): Promise<CharacterResponse> => {
  const params = new URLSearchParams({ page: String(page) });

  if (filters.name) params.set("name", filters.name);
  if (filters.status) params.set("status", filters.status);
  if (filters.gender) params.set("gender", filters.gender);

  const response = await fetch(
    `https://rickandmortyapi.com/api/character?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Could not find characters matching those filters.");
  }

  const data: CharacterResponse = await response.json();

  return data;
};
