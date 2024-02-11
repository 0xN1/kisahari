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
import { Suspense, useState } from "react";
import { KeyIcon, LockIcon } from "lucide-react";
import useLocalStorage from "@/hooks/use-local-storage";

type ModelType = "ollama" | "openAI";

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
  const [modelType, setModelType] = useLocalStorage("modelType", "ollama");
  const [openAIKey, setOpenAIKey] = useLocalStorage("openAIKey", null);

  const [showKey, setShowKey] = useState(false);

  if (!models || model === "") {
    return (
      <div className="flex flex-row justify-between w-full items-center ring-1 ring-zinc-700 px-6 py-2 rounded-t-xl rounded-b-sm">
        <div className="flex-1 flex flex-row gap-2 items-center">
          <img src="/icon.svg" alt="icon" className="h-6 w-6" />
          <h1 className="text-xl font-normal">[{data.title}]</h1>
          <span className="text-sm">{data.version}</span>
        </div>

        <div className="uppercase py-2 animate-pulse">LOADING...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-between w-full items-center ring-1 ring-zinc-700 px-6 py-2 rounded-t-xl rounded-b-sm">
      <div className="flex-1 flex flex-row gap-2 items-center">
        <img src="/icon.svg" alt="icon" className="h-6 w-6" />
        <h1 className="text-xl font-normal">[{data.title}]</h1>
        <span className="text-sm">{data.version}</span>
      </div>

      <div className="flex flex-row items-center gap-4 max-w-fit w-full self-end">
        {modelType === "ollama" ? (
          <LocalModelSelector
            models={models}
            setModel={setModel}
            model={model}
          />
        ) : (
          <APIKeyInput
            openAIKey={openAIKey}
            setOpenAIKey={setOpenAIKey}
            showKey={showKey}
            setShowKey={setShowKey}
          />
        )}

        <ModelTypeSelector modelType={modelType} setModelType={setModelType} />

        <div className="uppercase py-2">
          <CurrentTime />
        </div>
      </div>
    </div>
  );
};

export default Header;

const APIKeyInput = ({
  openAIKey,
  setOpenAIKey,
  showKey,
  setShowKey,
}: {
  openAIKey: string;
  setOpenAIKey: (key: string) => void;
  showKey: boolean;
  setShowKey: (showKey: boolean) => void;
}) => {
  if (showKey && openAIKey !== "") {
    return (
      <>
        <button
          onClick={() => setShowKey(false)}
          className="flex h-10 items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 ring-offset-background focus:outline-none focus:ring-1 focus:ring-lime-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 text-xs"
        >
          <LockIcon className="h-5 w-5" />
        </button>

        <input
          type="text"
          className="flex h-10 w-full min-w-fit items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-lime-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 text-xs"
          placeholder="OPENAI API KEY"
          value={openAIKey}
          onChange={(e) => setOpenAIKey(e.target.value)}
        />
      </>
    );
  } else {
    return (
      <>
        <button
          onClick={() => setShowKey(true)}
          className="flex h-10 items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 ring-offset-background focus:outline-none focus:ring-1 focus:ring-lime-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 text-xs"
        >
          <KeyIcon className="h-5 w-5" />
        </button>
      </>
    );
  }
};

const LocalModelSelector = ({
  models,
  setModel,
  model,
}: {
  models: ListResponse;
  setModel: (model: string) => void;
  model: string;
}) => {
  return (
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
  );
};

const ModelTypeSelector = ({
  modelType,
  setModelType,
}: {
  modelType: ModelType;
  setModelType: (modelType: ModelType) => void;
}) => {
  return (
    <Select
      onValueChange={(value) => {
        setModelType(value as ModelType);
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
  );
};
