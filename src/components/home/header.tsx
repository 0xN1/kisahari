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
import { KeyIcon, LockIcon, MenuIcon, XIcon } from "lucide-react";

type ModelType = "ollama" | "openAI";

const Header = ({
  data,
  models,
  setModelType,
  modelType,
  selectedOllamaModel,
  setSelectedOllamaModel,
  openAIKey,
  setOpenAIKey,
  isLoading,
  openAiModels,
  setSelectedOpenAiModel,
  selectedOpenAiModel,
}: {
  data: { title: string; version: string };
  models: ListResponse;
  setSelectedOllamaModel: (model: string) => void;
  setModelType: (modelType: ModelType) => void;
  modelType: ModelType;
  selectedOllamaModel: string;
  openAIKey: string;
  setOpenAIKey: (key: string) => void;
  isLoading: boolean;
  openAiModels: any;
  setSelectedOpenAiModel: (model: string) => void;
  selectedOpenAiModel: string;
}) => {
  const [showKey, setShowKey] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="flex flex-row justify-between w-full items-center ring-1 ring-zinc-700 px-2 sm:px-4 md:px-6 py-2 rounded-t-xl rounded-b-sm">
      <div className="flex-1 flex flex-row gap-2 items-center">
        <img src="/icon.svg" alt="icon" className="h-6 w-6" />
        <h1 className="text-lg sm:text-xl font-normal">[{data.title}]</h1>
        <span className="text-xs sm:text-sm">{data.version}</span>
      </div>

      {isLoading ? (
        <div className="uppercase py-2 animate-pulse">LOADING...</div>
      ) : (
        <>
          <div className="md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 text-zinc-400 hover:text-lime-300"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>

          <div
            className={`hidden sm:flex flex-col md:flex-row items-center gap-2 md:gap-4 max-w-fit w-full self-end mt-2 md:mt-0`}
          >
            {modelType === "ollama" ? (
              <LocalModelSelector
                models={models}
                setModel={setSelectedOllamaModel}
                model={selectedOllamaModel}
              />
            ) : (
              <>
                <APIKeyInput
                  openAIKey={openAIKey}
                  setOpenAIKey={setOpenAIKey}
                  showKey={showKey}
                  setShowKey={setShowKey}
                />

                <LocalModelSelector
                  models={openAiModels}
                  setModel={setSelectedOpenAiModel}
                  model={selectedOpenAiModel}
                />
              </>
            )}

            <ModelTypeSelector
              modelType={modelType}
              setModelType={setModelType}
            />

            <div className="uppercase py-2">
              <CurrentTime />
            </div>
          </div>

          {showMobileMenu && (
            <div className="sm:hidden fixed z-30 top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-zinc-900/80 backdrop-blur-sm">
              <button
                onClick={() => setShowMobileMenu(false)}
                className="absolute top-6 right-6"
              >
                <XIcon className="h-5 w-5" />
              </button>
              <div className=" gap-2 flex flex-col w-full px-4 py-2">
                {modelType === "ollama" ? (
                  <LocalModelSelector
                    models={models}
                    setModel={setSelectedOllamaModel}
                    model={selectedOllamaModel}
                  />
                ) : (
                  <>
                    <APIKeyInput
                      openAIKey={openAIKey}
                      setOpenAIKey={setOpenAIKey}
                      showKey={showKey}
                      setShowKey={setShowKey}
                    />

                    <LocalModelSelector
                      models={openAiModels}
                      setModel={setSelectedOpenAiModel}
                      model={selectedOpenAiModel}
                    />
                  </>
                )}

                <ModelTypeSelector
                  modelType={modelType}
                  setModelType={setModelType}
                />
              </div>
              <div className="text-xs text-zinc-400 p-8 mt-8 text-center flex flex-col gap-4 border border-zinc-700 rounded-sm m-4">
                <p className="p-2">
                  If you are not seeing any models for ollama, please serve your
                  ollama with the following command:
                </p>
                <pre className="pt-2 bg-zinc-800 p-2 rounded-sm w-max mx-auto">
                  $ OLLAMA_HOST=0.0.0.0 ollama serve
                </pre>
              </div>
            </div>
          )}
        </>
      )}
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
  return (
    <>
      <button
        onClick={() => setShowKey(!showKey)}
        className="flex h-10 items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 ring-offset-background focus:outline-none focus:ring-1 focus:ring-lime-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 text-xs"
      >
        {showKey ? (
          <LockIcon className="h-5 w-5" />
        ) : (
          <KeyIcon className="h-5 w-5" />
        )}
      </button>

      {showKey && (
        <input
          type="text"
          className="flex h-10 w-full min-w-fit items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-lime-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 text-xs"
          placeholder="OPENAI API KEY"
          value={openAIKey}
          onChange={(e) => setOpenAIKey(e.target.value)}
        />
      )}
    </>
  );
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
