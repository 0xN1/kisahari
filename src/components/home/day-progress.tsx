import { cn } from "@/lib/utils";

const DayProgress = () => {
  const calcDayProgress = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    const year = now.getFullYear();
    const daysInYear = year % 4 === 0 ? 366 : 365;
    return (day / daysInYear) * 100;
  };

  return (
    <div className="w-full relative flex flex-row text-xs justify-between items-center">
      <div
        className={cn(
          "flex flex-row self-start max-w-[95vw] py-2 px-4  bg-lime-400 rounded-[2px]  text-zinc-800",
          `w-[${calcDayProgress()}vw]`
        )}
      ></div>
      <span
        className={cn(
          calcDayProgress() > 92 ? "text-zinc-800" : "text-lime-400",
          "absolute right-6 font-medium text-[0.9em]"
        )}
      >
        {calcDayProgress().toFixed(1)}%
      </span>
    </div>
  );
};

export default DayProgress;
