import { cn } from "@/lib/utils";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <main
      className={cn(
        "flex relative flex-col min-h-screen items-center justify-between w-full h-full p-2 sm:p-4 md:p-8 bg-zinc-100/15 dark:bg-zinc-900/10 font-extralight z-10 max-h-screen",
        className
      )}
    >
      {children}
    </main>
  );
};

export default Container;
