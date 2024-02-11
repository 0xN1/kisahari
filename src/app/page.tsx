"use client";

import HomePage from "@/app/home";
import { useLiveQuery } from "dexie-react-hooks";
import { entries } from "@/lib/index-db";

export default function Home() {
  const allEntries = useLiveQuery(
    () => entries.toArray(),
    [entries]
  ) as JournalEntry[];

  const sortedEntries = allEntries?.sort(
    (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
  );

  if (allEntries) {
    return <HomePage entries={sortedEntries} />;
  } else {
    return <HomePage entries={[]} />;
  }
}
