"use client";

import { Spacer } from "@/components/home/spacer";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Entry = ({
  date,
  title,
  content,
  tldr,
}: {
  date: string;
  title: string;
  content: string;
  tldr?: string;
}) => {
  const [closed, setClosed] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          setClosed(!closed);
        }}
        className="flex flex-row items-center mt-2 sm:mt-0 gap-2 group cursor-pointer hover:text-lime-300 hover:animate-pulse transition-colors duration-200 ease-in-out"
      >
        <div className="p-2 sm:p-3 scale-50 ring-2 ring-zinc-500 group-hover:bg-lime-500 group-hover:ring-0 group-hover:animate-pulse rounded-full" />
        <div
          className={cn(
            "uppercase text-xs sm:text-sm text-zinc-500 group-hover:text-lime-300",
            !closed && "text-zinc-200"
          )}
        >
          {date}
        </div>
      </div>
      {!closed && (
        <div
          className="border-l-0 sm:border-l-2 px-6 sm:pl-4 md:pl-8 sm:ml-3 flex flex-col gap-2 sm:gap-4 text-xs sm:text-sm
            text-zinc-300 whitespace-pre-line"
        >
          <Spacer />
          <h1 className="uppercase text-base sm:text-xl font-light">{title}</h1>
          {tldr && (
            <h1 className="text-xs font-light text-zinc-500 -my-1 sm:-my-2">
              {tldr}
            </h1>
          )}
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="whitespace-pre-line max-w-prose text-xs sm:text-sm text-zinc-300"
          />
          <Spacer />
        </div>
      )}
    </>
  );
};

export default Entry;
