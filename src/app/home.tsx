"use client";

import CurrentTime from "@/components/current-time";
import { cn, formatDate } from "@/lib/utils";
import EntryDialog from "@/components/entry-dialog";
import { useState } from "react";

const data = {
  title: "KISAHARI",
  version: "v010",
  footer: {
    left_copy: "A JOURNAL BY N1",
    right_copy: "KISAHARI © 2024",
  },
};

const calcDayProgress = () => {
  // calculate current day relative to the start of the year
  // turn that into a 0-100% value
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  const year = now.getFullYear();
  const daysInYear = year % 4 === 0 ? 366 : 365;
  return (day / daysInYear) * 100;
};

export default async function HomePage({ entries }: { entries: Entry[] }) {
  return (
    <Container>
      <Header />
      {/* <div className="flex flex-row justify-between w-full max-w-[95w] items-center py-1 px-4 bg-zinc-800 rounded-full"></div> */}
      <EntriesContainer>
        {entries.map((entry) => (
          <Entry
            key={entry.id}
            date={formatDate(entry.created)}
            title={entry.title}
            content={entry.content}
          />
        ))}
      </EntriesContainer>

      <div className="w-full relative flex flex-row text-xs justify-between items-center">
        <div
          className={cn(
            "flex flex-row self-start max-w-[95vw] py-2 px-4  bg-lime-400 rounded-[2px]  text-zinc-800",
            `w-[${calcDayProgress()}vw]`
            // `w-[92vw]`
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

      <Footer />
    </Container>
  );
}

export const Spacer = () => <div className="spacer my-1"></div>;

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col min-h-screen items-center justify-between w-full h-full p-8 bg-zinc-100/15 dark:bg-zinc-900/10 font-extralight z-10">
      {children}
    </main>
  );
};

const EntriesContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex-1 relative h-full flex flex-col gap-4 p-8 sm:p-16 items-start w-full ring-1 ring-zinc-700
      overflow-y-auto max-h-[82vh] rounded-sm scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-900"
    >
      {children}
    </div>
  );
};

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
          className="sm:border-l-2 pl-2 sm:pl-8 sm:ml-3 flex flex-col gap-4 text-sm
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

const Header = () => {
  return (
    <div className="flex flex-row justify-between w-full items-center ring-1 ring-zinc-700 px-6 py-2 rounded-t-xl rounded-b-sm">
      <div className="flex-1 flex flex-row gap-2">
        <h1 className="text-xl font-normal">[{data.title}]</h1>
        <span className="self-end text-sm">{data.version}</span>
      </div>
      <div className="uppercase py-2">
        <CurrentTime />
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="flex flex-row justify-between w-full items-center ring-1 ring-zinc-700 px-6 py-2 rounded-b-xl rounded-t-sm">
      <div className="text-xs">{data.footer.left_copy}</div>
      <EntryDialog />
      <div className="text-xs">{data.footer.right_copy}</div>
    </div>
  );
};
