"use client";

import { Spacer } from "@/components/home/spacer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { entries } from "@/lib/index-db";
import { RotateCcw } from "lucide-react";
import { useState } from "react";

const EntryDialog = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tldr = formData.get("tldr") as string;

    const entry = {
      title,
      content,
      tldr,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    };

    if (title.length < 1 || content.length < 1 || content.length < 1) {
      alert("Invalid input");
      return;
    }

    const res = await entries.add(entry);

    if (res) {
      setOpen(false);
    } else {
      alert("Entry not added");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-[10px] sm:text-xs uppercase hover:bg-lime-500 px-2 sm:px-4 md:px-6 py-1 sm:py-2 hover:text-zinc-800">
        ADD ENTRY
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-mono uppercase text-xs sm:text-sm font-thin">
            Add entry
          </DialogTitle>

          <Spacer />
          <span className="py-[0.4px] bg-zinc-700"></span>
          <Spacer />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(new FormData(e.target as HTMLFormElement));
            }}
            className="w-full h-full flex flex-col items-center justify-center gap-2 sm:gap-4 font-mono"
          >
            <div className="text-start w-full items-start h-auto max-w-prose flex justify-center flex-col gap-1 sm:gap-2">
              <h3 className="font-light text-xs sm:text-sm font-mono uppercase">
                Title
              </h3>
              <input
                minLength={2}
                maxLength={50}
                className="max-w-prose w-full text-xs bg-transparent focus:outline-none break-words ring-zinc-400 ring-1 px-2 sm:px-3 py-1 sm:py-2 rounded-lg"
                name="title"
                placeholder="Neon Circuits"
              />
              <h4 className="ml-1 text-[10px] sm:text-xs uppercase text-zinc-600">
                Make it pop
              </h4>
            </div>
            <div className="text-start w-full items-start h-auto max-w-prose flex justify-center flex-col gap-1 sm:gap-2">
              <h3 className="font-light text-xs sm:text-sm font-mono uppercase">
                TL;DR{" "}
              </h3>
              <textarea
                maxLength={100}
                rows={2}
                className="max-w-prose w-full text-xs bg-transparent focus:outline-none break-words ring-zinc-400 ring-1 px-2 sm:px-3 py-1 sm:py-2 rounded-lg"
                name="tldr"
                placeholder="Cyberpunk-themed city with neon lights and AR technology exploring the mysteries of the future."
              />
              <h4 className="ml-1 text-[10px] sm:text-xs uppercase text-zinc-600">
                Keep it concise, short
              </h4>
            </div>
            <div className="text-start w-full items-start h-auto max-w-prose flex justify-center flex-col gap-1 sm:gap-2">
              <h3 className="font-light text-xs sm:text-sm font-mono uppercase">
                Content
              </h3>
              <textarea
                maxLength={500}
                rows={5}
                className="max-w-prose w-full text-xs bg-transparent focus:outline-none break-words ring-zinc-400 ring-1 px-2 sm:px-3 py-1 sm:py-2 rounded-lg"
                name="content"
                placeholder="Neon circuits intertwine in the shadows of a megacity. Augmented reality transcends reality itself, unveiling the mysteries of the future. Welcome to the cybernetic age."
              />
              <h4 className="ml-1 text-[10px] sm:text-xs uppercase text-zinc-600">
                Min 10 chars, Max 500 chars, HTML allowed
              </h4>
            </div>

            <div className="flex gap-4 sm:gap-8 w-full justify-end items-center relative">
              <div className="flex gap-2">
                <button
                  type="reset"
                  className="px-2 sm:px-4 py-1 sm:py-2 text-zinc-400 hover:text-lime-300 rounded-md"
                >
                  <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <button
                  className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm hover:bg-lime-500 text-zinc-200 ring-1 ring-zinc-300 rounded-sm hover:text-zinc-800 uppercase"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EntryDialog;
