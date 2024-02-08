import { notFound } from "next/navigation";
import HomePage from "@/app/home";

export default async function Home() {
  const res = await fetch(process.env.NEXT_PUBLIC_ENTRIES_URL!, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return notFound();

  const { items: entries }: { items: Entry[] } = await res.json();
  if (!entries) return notFound();

  return <HomePage entries={entries.reverse()} />;
}
