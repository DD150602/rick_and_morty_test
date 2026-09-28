import Link from "next/link";

export default function WelcomePage() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-6xl flex-col items-center justify-center gap-6 px-6 text-center text-white">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Welcome to the Rick and Morty Explorer
      </h1>
      <p className="max-w-2xl text-white/70">
        Browse characters and episodes from across the multiverse.
      </p>
      <Link
        className="rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 transition-colors hover:bg-cyan-200"
        href="/characters"
      >
        Explore characters
      </Link>
      <Link
        className="rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 transition-colors hover:bg-cyan-200"
        href="/episodes"
      >
        Explore Episodes
      </Link>
    </main>
  );
}
