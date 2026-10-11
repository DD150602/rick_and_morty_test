import type { Episode } from "@/types/episode";

interface EpisodeCardProps
  extends Pick<Episode, "id" | "name" | "episode" | "air_date"> {}

export const EpisodeCard = (props: EpisodeCardProps) => {
  return (
    <div
      key={props.id}
      className="block rounded-md border border-gray-300 p-4 shadow-sm"
    >
      <h2 className="text-lg font-medium wrap-break-word text-white/90">
        {props.name}
      </h2>

      <p className="mt-2 text-sm text-white/80">Episode: {props.episode}</p>

      <p className="mt-2 text-sm text-white/70">Air date: {props.air_date}</p>
    </div>
  );
};
