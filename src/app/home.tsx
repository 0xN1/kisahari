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
  version: "v020",
  footer: {
    left_copy: "YOUR PERSONAL JOURNAL",
    right_copy: "KISAHARI © 2024",
  },
};

export default function HomePage({ entries }: { entries: JournalEntry[] }) {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [time, setTime] = useState("");
  const [showAI, setShowAI] = useState(false);
  const [models, setModels] = useState<ListResponse>();
  const [model, setModel] = useState<string>("");
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
        };

        if (modelType === "openAI" && openAIKey && openAIKey.length > 0) {
          const stream = await askOpenAI(entries, q, openAIKey);
          processStream(stream);
        }

        if (modelType === "ollama") {
          const stream = await askAI(entries, model, q);
          processStream(stream);
        }
      } catch (error) {
        setLoading(false);
        setAnswer("Error: " + error);
      }
    },
    [entries, model, modelType, openAIKey]
  );

  useEffect(() => {
    const getModels = async () => {
      const models = await getAllModels();
      setModels(models);
      setIsLoading(false);
    };
    getModels();
  }, []);

  useEffect(() => {
    setModel(models?.models[0]?.name || "");
}, [models]);

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
        models={models!}
        {...{
          model,
          data,
          setModel,
          setModelType,
          modelType,
          openAIKey,
          setOpenAIKey,
          isLoading,
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
