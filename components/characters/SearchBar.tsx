import type { FormEvent } from "react";
import type { CharacterFilters } from "@/lib/rickAndMorty";

interface SearchBarProps {
  placeholder: string;
  onSearch: (filters: CharacterFilters) => void;
}

export const SearchBar = (props: SearchBarProps) => {
  const { placeholder, onSearch } = props;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    onSearch({
      name: String(formData.get("name") ?? "").trim(),
      status: String(formData.get("status") ?? ""),
      gender: String(formData.get("gender") ?? ""),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full grid-cols-1 gap-3 rounded-xl border border-white/15 bg-white/5 p-3 sm:grid-cols-2 lg:grid-cols-[minmax(12rem,1fr)_10rem_10rem_auto] lg:items-end"
    >
      <label className="flex min-w-0 flex-col gap-1.5 text-sm text-white/70 sm:col-span-2 lg:col-span-1">
        Character
        <input
          name="name"
          aria-label="Search characters"
          className="h-10 w-full rounded-lg border border-white/20 bg-slate-950/40 px-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-cyan-300"
          placeholder={placeholder}
          type="search"
        />
      </label>
      <label
        htmlFor="status"
        className="flex flex-col gap-1.5 text-sm text-white/70"
      >
        Status
        <select
          className="h-10 w-full rounded-lg border border-white/20 bg-slate-950/40 px-3 text-sm text-white outline-none focus:border-cyan-300"
          name="status"
          id="status"
          defaultValue=""
        >
          <option value="">Any status</option>
          <option value="alive">alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">unknown</option>
        </select>
      </label>
      <label
        htmlFor="gender"
        className="flex flex-col gap-1.5 text-sm text-white/70"
      >
        Gender
        <select
          className="h-10 w-full rounded-lg border border-white/20 bg-slate-950/40 px-3 text-sm text-white outline-none focus:border-cyan-300"
          name="gender"
          id="gender"
          defaultValue=""
        >
          <option value="">Any gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
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
