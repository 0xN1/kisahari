import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const DayProgress = () => {
  const [progressWidth, setProgressWidth] = useState(0);

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

  useEffect(() => {
    setProgressWidth(calcDayProgress());

    const interval = setInterval(() => {
      setProgressWidth(calcDayProgress());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full relative flex flex-row text-xs justify-between items-center">
      <div className="w-full bg-zinc-800 h-3 sm:h-6 rounded-[2px] overflow-hidden">
        <div
          className="h-full bg-lime-400 rounded-[2px] text-zinc-800 transition-width duration-300"
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>
      <span
        className={cn(
          progressWidth > 92 ? "text-zinc-800" : "text-lime-400",
          "absolute right-2 sm:right-4 md:right-6 font-medium text-[0.9em]"
        )}
      >
        {progressWidth.toFixed(1)}%
      </span>
    </div>
  );
};

export default DayProgress;
