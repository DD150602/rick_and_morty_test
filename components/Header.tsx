import Link from "next/link";
import { CustomLink } from "@/components/CustomLink";

export const Header = () => {
  return (
    <header className="sticky top-4 z-10 mx-auto mt-4 flex w-[calc(100%-2rem)] max-w-6xl flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-bold text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10 backdrop-blur-xl">
      <Link href="/">
        <h1 className="text-lg tracking-wide">Titulo de la pagina</h1>
      </Link>
      <nav className="flex items-center justify-center gap-2">
        <CustomLink href="/favorites" linkName="Favorites" />
        <CustomLink href="/characters" linkName="Characters" />
        <CustomLink href="/episodes" linkName="Episodes" />
      </nav>
    </header>
  );
};
