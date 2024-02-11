import { cn } from "@/lib/utils";
import { Atom } from "lucide-react";

const AIButton = ({
  showAI,
  setShowAI,
}: {
  showAI: boolean;
  setShowAI: (showAI: boolean) => void;
}) => {
  return (
    <div className="absolute right-8 top-[14vh]">
      <button
        onClick={() => {
          setShowAI(!showAI);
        }}
        className={cn(
          "bg-zinc-800 group transition-colors ease-in-out duration-200 hover:bg-lime-500 px-2 py-2 rounded-l-md",
          showAI && "bg-lime-500 hover:bg-zinc-800"
        )}
      >
        <Atom
          className={cn(
            "w-4 h-4 text-zinc-800 hover:text-lime-500 transition-colors ease-in-out duration-200 group-hover:text-lime-500",
            !showAI &&
              "text-lime-500 group-hover:text-zinc-800 animate-pulse duration-1000 ease-linear"
          )}
        />
      </button>
    </div>
  );
};

export default AIButton;
