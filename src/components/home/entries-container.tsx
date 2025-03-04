const EntriesContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex-1 relative h-full flex flex-col gap-0 sm:gap-4 p-2 sm:p-4 md:p-8 lg:p-16 pt-[14vh] sm:pt-0 items-start w-full ring-1 ring-zinc-700
        overflow-y-auto max-h-[85vh] sm:max-h-[78vh] md:max-h-[82vh] rounded-sm scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
    >
      {children}
    </div>
  );
};

export default EntriesContainer;
