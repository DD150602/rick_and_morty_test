interface MainContainerProps {
  children: React.ReactNode;
}

export const MainContainer = (props: MainContainerProps) => {
  return (
    <main className="grid w-full max-w-5xl grid-cols-1 gap-4 px-4 py-8 sm:grid-cols-2 sm:py-12 lg:grid-cols-3">
      {props.children}
    </main>
  );
};
