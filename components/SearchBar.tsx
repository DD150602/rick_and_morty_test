interface SearchBarProps {
  placeholder: string;
}
export const SearchBar = (props: SearchBarProps) => {
  const { placeholder } = props;
  return (
    <form className="flex w-full max-w-md items-center gap-2 rounded-full border border-white/20 bg-white/10 p-1.5 shadow-lg shadow-black/10 backdrop-blur-md transition focus-within:border-cyan-300/60 focus-within:ring-2 focus-within:ring-cyan-300/30">
      <input
        aria-label="Search characters"
        className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-white outline-none placeholder:text-white/50"
        placeholder={placeholder}
        type="search"
      />
      <button
        className="rounded-full bg-cyan-300 px-5 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};
