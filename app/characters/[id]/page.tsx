import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Character } from "@/types/character";

export default async function CharacterDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`,
  );

  if (!response.ok) {
    notFound();
  }

  const character: Character = await response.json();

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col px-4 py-8 text-white sm:px-6 sm:py-12">
      <Link
        className="mb-6 w-fit text-sm text-white/70 transition-colors hover:text-white sm:mb-8"
        href="/characters"
      >
        ← Back to characters
      </Link>

      <article className="flex flex-col gap-6 rounded-3xl border border-white/15 bg-white/5 p-4 shadow-xl shadow-black/20 backdrop-blur sm:flex-row sm:items-start sm:gap-8 sm:p-8">
        <Image
          alt={character.name}
          className="size-40 shrink-0 self-center rounded-2xl object-cover min-[400px]:size-48 sm:size-56 sm:self-start lg:size-64"
          height={256}
          src={character.image}
          width={256}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-4 text-center sm:text-left">
          <div>
            <h1 className="text-2xl font-bold break-words sm:text-3xl">
              {character.name}
            </h1>
            <p className="mt-2 text-white/70">
              {character.status} · {character.species}
              {character.type ? ` · ${character.type}` : ""}
            </p>
          </div>

          <dl className="grid grid-cols-1 gap-3 text-left text-sm md:grid-cols-2">
            <div className="min-w-0">
              <dt className="text-white/50">Gender</dt>
              <dd className="break-words">{character.gender}</dd>
            </div>
            <div className="min-w-0">
              <dt className="text-white/50">Origin</dt>
              <dd className="break-words">{character.origin.name}</dd>
            </div>
            <div className="min-w-0">
              <dt className="text-white/50">Last known location</dt>
              <dd className="break-words">{character.location.name}</dd>
            </div>
            <div className="min-w-0">
              <dt className="text-white/50">Episodes</dt>
              <dd>{character.episode.length}</dd>
            </div>
          </dl>
        </div>
      </article>
    </main>
  );
}