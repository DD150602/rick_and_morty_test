import { episodeApiCall } from "@/lib/episodes";

export default async function EpisodesPage() {
  const data = await episodeApiCall();

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl mt-2">Episodes</h1>

      <main className="grid grid-cols-2 w-full max-w-5xl items-center justify-between py-20 gap-4">
        {data.results.map((episode) => (
          <div
            key={episode.id}
            className="block rounded-md border border-gray-300 p-4 shadow-sm"
          >
            <h2 className="text-lg font-medium text-white/90">
              {episode.name}
            </h2>

            <p className="mt-2 text-sm text-white/80">
              Episode: {episode.episode}
            </p>

            <p className="mt-2 text-sm text-white/70">
              Air date: {episode.air_date}
            </p>
          </div>
        ))}
      </main>
    </div>
  );
}