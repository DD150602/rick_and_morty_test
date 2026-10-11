import Link from "next/link";
import { CustomLink } from "@/components/CustomLink";

export const Header = () => {
  return (
    <header className="sticky top-2 z-10 mx-auto mt-2 flex w-[calc(100%-1rem)] max-w-6xl flex-col items-center justify-between gap-3 rounded-2xl border border-white/20 bg-white/10 px-3 py-3 font-bold text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10 backdrop-blur-xl sm:top-4 sm:mt-4 sm:w-[calc(100%-2rem)] sm:flex-row sm:gap-4 sm:px-6 sm:py-4">
      <Link className="shrink-0" href="/">
        <h1 className="text-lg tracking-wide">Titulo de la pagina</h1>
      </Link>
      <nav className="flex w-full flex-wrap items-center justify-center gap-1 sm:w-auto sm:gap-2">
        <CustomLink href="/characters" linkName="Characters" />
        <CustomLink href="/episodes" linkName="Episodes" />
        <CustomLink href="/favorites" linkName="Favorites" />
        <CustomLink href="/favorites/episodes" linkName="Fav. Episodes" />
      </nav>
    </header>
  );
};
