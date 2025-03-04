"use client";

import { formatDate } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { getAllModels } from "@/lib/llm";
import type { ListResponse } from "ollama";

import AIChat from "@/components/home/ai-chat";
import Footer from "@/components/home/footer";
import Container from "@/components/home/container";
import EntriesContainer from "@/components/home/entries-container";
import Entry from "@/components/home/entry";
import Header from "@/components/home/header";
import AIButton from "@/components/home/ai-button";
import DayProgress from "@/components/home/day-progress";
import { askAI, askOpenAI } from "@/lib/langchain";
import useLocalStorage from "@/hooks/use-local-storage";

const data = {
  title: "KISAHARI",
  version: "v040",
  footer: {
    left_copy: "YOUR PERSONAL JOURNAL",
    right_copy: "KISAHARI © ",
  },
};

export default function HomePage({ entries }: { entries: JournalEntry[] }) {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [time, setTime] = useState("");
  const [showAI, setShowAI] = useState(false);
  const [ollamaModels, setOllamaModels] = useState<ListResponse>();
  const [selectedOllamaModel, setSelectedOllamaModel] = useState<string>("");

  const [openAiModels] = useState({
    models: [
      {
        name: "gpt-3.5-turbo",
      },
      {
        name: "gpt-4",
      },
    ],
  });

  const [selectedOpenAiModel, setSelectedOpenAiModel] =
    useState<string>("gpt-3.5-turbo");
  const [modelType, setModelType] = useLocalStorage("modelType", "ollama");
  const [openAIKey, setOpenAIKey] = useLocalStorage("openAIKey", null);
  const [isLoading, setIsLoading] = useState(true);

  // const openAIKey = useReadLocalStorage<string>("openAIKey");

  const askLLM = useCallback(
    async (formData: FormData) => {
      performance.mark("start");
      const q = formData.get("q") as string;
      setLoading(true);

      try {
        const processStream = async (stream: any) => {
          let answer = [];
          try {
            for await (const chat of stream) {
              answer.push(chat.answer);
              const ans = answer.join("");

              setAnswer(ans);
            }
            performance.mark("end");
            setLoading(false);
            performance.measure("askAI", "start", "end");
            setTime(
              `TIME:${(
                performance.getEntriesByName("askAI")[0].duration / 1000
              ).toFixed(1)}s`
            );
          } catch (error) {
            setLoading(false);
            setAnswer("Error: " + error);
          }
        };

        if (modelType === "openAI") {
          const stream = await askOpenAI(
            entries,
            q,
            openAIKey,
            selectedOpenAiModel
          );
          processStream(stream);
        }

        if (modelType === "ollama") {
          const stream = await askAI(entries, selectedOllamaModel, q);
          processStream(stream);
        }
      } catch (error) {
        setLoading(false);
        setAnswer("Error: " + error);
      }
    },
    [entries, selectedOllamaModel, selectedOpenAiModel, modelType, openAIKey]
  );

  useEffect(() => {
    const getModels = async () => {
      const models = await getAllModels();
      setOllamaModels(models);
      setIsLoading(false);
    };
    getModels();
  }, []);

  useEffect(() => {
    setSelectedOllamaModel(ollamaModels?.models[0]?.name || "");
  }, [ollamaModels]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "k") {
        setShowAI(!showAI);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showAI]);

  return (
    <Container>
      <Header
        models={ollamaModels!}
        {...{
          openAiModels,
          selectedOllamaModel,
          data,
          setSelectedOllamaModel,
          setModelType,
          modelType,
          openAIKey,
          setOpenAIKey,
          isLoading,
          setSelectedOpenAiModel,
          selectedOpenAiModel,
        }}
      />

      <EntriesContainer>
        {entries.map((entry) => (
          <Entry
            key={entry.id}
            date={formatDate(new Date(entry.created))}
            title={entry.title}
            content={entry.content}
            tldr={entry.tldr}
          />
        ))}
      </EntriesContainer>

      <DayProgress />

      {showAI && (
        <AIChat
          {...{
            answer,
            time,
            loading,
            askLLM,
            setAnswer,
            setTime,
            setLoading,
          }}
        />
      )}

      <AIButton {...{ showAI, setShowAI }} />

      <Footer {...data} />
    </Container>
  );
}
