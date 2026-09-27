import type { ApiInfo } from "./character"

export interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

export interface EpisodeResponse {
  info: ApiInfo
  results: Episode[]
}