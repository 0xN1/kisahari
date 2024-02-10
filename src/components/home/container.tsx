const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex relative flex-col min-h-screen items-center justify-between w-full h-full p-8 bg-zinc-100/15 dark:bg-zinc-900/10 font-extralight z-10 max-h-screen">
      {children}
    </main>
  );
};

export default Container;
