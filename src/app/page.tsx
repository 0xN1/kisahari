import { notFound } from "next/navigation";
import HomePage from "@/app/home";
import { llmIndex } from "@/lib/llm";

export default async function Home() {
  const res = await fetch(process.env.NEXT_PUBLIC_ENTRIES_URL!, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return notFound();

  const { items: entries }: { items: Entry[] } = await res.json();
  if (!entries) return notFound();

  // console.log(JSON.stringify(entries, null, 2));

  // console.log(await llmIndex(entries));

  return <HomePage entries={entries.reverse()} />;
}
