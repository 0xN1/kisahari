const EntriesContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex-1 relative h-full flex flex-col gap-4 p-8 sm:p-16 items-start w-full ring-1 ring-zinc-700
        overflow-y-auto max-h-[82vh] rounded-sm scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
    >
      {children}
    </div>
  );
};

export default EntriesContainer;
