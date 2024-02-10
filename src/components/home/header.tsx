"use client";

import { ListResponse } from "ollama";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CurrentTime from "@/components/current-time";
import { useState } from "react";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";

const Header = ({
  data,
  models,
  setModel,
  model,
}: {
  data: { title: string; version: string };
  models: ListResponse;
  setModel: (model: string) => void;
  model: string;
}) => {
  // const [modelType, setModelType] = useState<"ollama" | "openAI">("openAI");
  const currKey = useReadLocalStorage<string>("openAIKey");

  const [modelType, setModelType] = useLocalStorage<"ollama" | "openAI">(
    "modelType",
    "openAI"
  );
  const [openAIKey, setOpenAIKey] = useLocalStorage<string>(
    "openAIKey",
    currKey!
  );

  return (
    <div className="flex flex-row justify-between w-full items-center ring-1 ring-zinc-700 px-6 py-2 rounded-t-xl rounded-b-sm">
      <div className="flex-1 flex flex-row gap-2">
        <h1 className="text-xl font-normal">[{data.title}]</h1>
        <span className="self-end text-sm">{data.version}</span>
      </div>
      <div className="flex flex-row items-center gap-4 max-w-lg w-full self-end">
        {modelType === "ollama" ? (
          <Select
            onValueChange={(value) => {
              setModel(value);
            }}
            value={model}
          >
            <SelectTrigger className="min-w-fit text-xs uppercase bg-transparent">
              <SelectValue placeholder="Models" />
            </SelectTrigger>
            <SelectContent className="text-sm">
              {models?.models.map((m) => (
                <SelectItem
                  className="font-mono uppercase font-thin text-xs"
                  value={m.name}
                  key={m.digest}
                >
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <input
            type="text"
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-lime-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 text-xs"
            placeholder="OPENAI API KEY"
            value={openAIKey}
            onChange={(e) => setOpenAIKey(e.target.value)}
          />
        )}

        <Select
          onValueChange={(value) => {
            setModelType(value as "ollama" | "openAI");
          }}
          value={modelType}
        >
          <SelectTrigger className="min-w-fit text-xs uppercase bg-transparent">
            <SelectValue placeholder="Mode" />
          </SelectTrigger>
          <SelectContent className="text-sm">
            <SelectItem
              className="font-mono uppercase font-thin text-xs"
              value="ollama"
            >
              ollama
            </SelectItem>
            <SelectItem
              className="font-mono uppercase font-thin text-xs"
              value="openAI"
            >
              openAI
            </SelectItem>
          </SelectContent>
        </Select>

        <div className="uppercase py-2">
          <CurrentTime />
        </div>
      </div>
    </div>
  );
};

export default Header;
