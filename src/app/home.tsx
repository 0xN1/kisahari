"use client";

import CurrentTime from "@/components/current-time";
import { cn, formatDate } from "@/lib/utils";
import EntryDialog from "@/components/entry-dialog";
import { useState } from "react";

const data = {
  title: "BUKU-LOG",
  version: "v001",
  footer: {
    left_copy: "A JOURNAL BY N1",
    right_copy: "KISAHARI © 2024",
  },
};

export default async function HomePage({ entries }: { entries: Entry[] }) {
  return (
    <main className="flex flex-col min-h-screen items-center justify-between w-full h-full p-8 bg-zinc-100/15 dark:bg-zinc-900/10 font-extralight z-10">
      <div className="flex flex-row justify-between w-full items-center ring-1 ring-zinc-700 px-4 py-2 rounded-t-xl rounded-b-sm">
        <div className="flex-1 flex flex-row gap-2">
          <h1 className="text-xl font-normal">[{data.title}]</h1>
          <span className="self-end text-sm">{data.version}</span>
        </div>
        <div className="uppercase py-2">
          <CurrentTime />
        </div>
        {/* <ModeToggle /> */}
      </div>
      {/* <div className="flex flex-row justify-between w-full max-w-[95w] items-center py-1 px-4 bg-zinc-800 rounded-full"></div> */}
      <div
        className="flex-1 relative h-full flex flex-col gap-4 p-8 sm:p-16 items-start w-full ring-1 ring-zinc-700
      overflow-y-auto max-h-[82vh] rounded-sm scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-900"
      >
        {entries.map((entry) => (
          <Entry
            key={entry.id}
            date={formatDate(entry.created)}
            title={entry.title}
            content={entry.content}
          />
        ))}
      </div>
      <div className="flex flex-row self-start w-[10vw] max-w-[95vw] px-4 py-1 bg-lime-400 rounded-sm"></div>
      <div className="flex flex-row justify-between w-full items-center ring-1 ring-zinc-700 px-4 py-2 rounded-b-xl rounded-t-sm">
        {/* <EntryDialog /> */}

        <div className="text-xs">{data.footer.left_copy}</div>
        <div className="text-xs">{data.footer.right_copy}</div>
      </div>
    </main>
  );
}

export const Spacer = () => <div className="spacer my-1"></div>;

const Entry = ({
  date,
  title,
  content,
}: {
  date: string;
  title: string;
  content: string;
}) => {
  const [closed, setClosed] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          setClosed(!closed);
        }}
        className="flex flex-row items-center gap-2 group cursor-pointer hover:text-lime-300 hover:animate-pulse transition-colors duration-200 ease-in-out"
      >
        <div className="p-3 scale-50 ring-2 ring-zinc-500 group-hover:bg-lime-500 group-hover:ring-0 group-hover:animate-pulse rounded-full" />
        <div
          className={cn(
            "uppercase text-zinc-500 group-hover:text-lime-300",
            !closed && "text-zinc-200"
          )}
        >
          {date}
        </div>
      </div>
      {!closed && (
        <div
          className="border-l-2 pl-8 ml-3 flex flex-col gap-4 text-sm
          text-zinc-300 whitespace-pre-line"
        >
          <Spacer />
          <h1 className="uppercase text-xl -ml-1 font-light">{title}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="whitespace-pre-line max-w-prose text-sm text-zinc-300"
          />
          <Spacer />
        </div>
      )}
    </>
  );
};
