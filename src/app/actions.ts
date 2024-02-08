"use server";

import PocketBase from "pocketbase";
import { revalidatePath } from "next/cache";
import { chat } from "@/lib/llm";

const addEntry = async (entry: EntrySubmission) => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL!);

  // const authRefresh = await pb.collection("kisahari_users").authRefresh();

  // if (!authRefresh) {
  //   return new Error("Failed to refresh token");
  // }

  const authData = await pb
    .collection("kisahari_users")
    .authWithPassword(
      process.env.NEXT_PUBLIC_USER!,
      process.env.NEXT_PUBLIC_PASS!
    );

  if (!pb.authStore.isValid) {
    return new Error("Failed to authenticate");
  }

  try {
    const record = await pb.collection("kisahari_entries").create(entry);
    revalidatePath("/");
    console.log(record);
    return record;
  } catch (e) {
    return new Error("Failed to add entry");
  }
};

const llmChat = async (data: Entry[], query: string) => {
  const q = query || "who are the rebels?";

  const response = await chat(data, q);

  if (response) {
    return response;
  }

  // if (response) {
  //   return {
  //     message: response.message,
  //     done: response.done,
  //     duration: response.duration,
  //   };
  // }
};

export { addEntry, llmChat };
