import type { FormEvent } from "react";
import type { EpisodeFilters } from "@/lib/episodes";

interface EpisodeSearchBarProps {
  placeholder: string;
  onSearch: (filters: EpisodeFilters) => void;
}

export const EpisodeSearchBar = (props: EpisodeSearchBarProps) => {
  const { placeholder, onSearch } = props;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    onSearch({
      name: String(formData.get("name") ?? "").trim(),
      episode: String(formData.get("episode") ?? "").trim(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full grid-cols-1 gap-3 rounded-xl border border-white/15 bg-white/5 p-3 sm:grid-cols-2 lg:grid-cols-[minmax(12rem,1fr)_10rem_auto] lg:items-end"
    >
      <label className="flex min-w-0 flex-col gap-1.5 text-sm text-white/70 sm:col-span-2 lg:col-span-1">
        Episode
        <input
          name="name"
          aria-label="Search episodes"
          className="h-10 w-full rounded-lg border border-white/20 bg-slate-950/40 px-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-cyan-300"
          placeholder={placeholder}
          type="search"
        />
      </label>
      <label
        htmlFor="episode"
        className="flex flex-col gap-1.5 text-sm text-white/70"
      >
        Code
        <input
          name="episode"
          id="episode"
          className="h-10 w-full rounded-lg border border-white/20 bg-slate-950/40 px-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-cyan-300"
          placeholder="S01E01"
          type="search"
        />
      </label>
      <button
        className="cursor-pointer h-10 rounded-lg bg-cyan-300 px-5 text-sm font-semibold text-slate-950 hover:bg-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 sm:col-span-2 lg:col-span-1"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};