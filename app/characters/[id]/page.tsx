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
    <main className="mx-auto flex w-full max-w-4xl flex-col px-6 py-12 text-white">
      <Link
        className="mb-8 w-fit text-sm text-white/70 transition-colors hover:text-white"
        href="/characters"
      >
        ← Back to characters
      </Link>

      <article className="flex flex-col gap-8 rounded-3xl border border-white/15 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur sm:flex-row sm:items-start sm:p-8">
        <Image
          alt={character.name}
          className="size-48 rounded-2xl object-cover sm:size-64"
          height={256}
          src={character.image}
          width={256}
        />

        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold">{character.name}</h1>
            <p className="mt-2 text-white/70">
              {character.status} · {character.species}
              {character.type ? ` · ${character.type}` : ""}
            </p>
          </div>

          <dl className="grid gap-3 text-sm">
            <div>
              <dt className="text-white/50">Gender</dt>
              <dd>{character.gender}</dd>
            </div>
            <div>
              <dt className="text-white/50">Origin</dt>
              <dd>{character.origin.name}</dd>
            </div>
            <div>
              <dt className="text-white/50">Last known location</dt>
              <dd>{character.location.name}</dd>
            </div>
            <div>
              <dt className="text-white/50">Episodes</dt>
              <dd>{character.episode.length}</dd>
            </div>
          </dl>
        </div>
      </article>
    </main>
  );
}
