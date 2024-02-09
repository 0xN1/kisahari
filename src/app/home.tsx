"use client";

import CurrentTime from "@/components/current-time";
import { cn, formatDate } from "@/lib/utils";
import EntryDialog from "@/components/entry-dialog";
import { useCallback, useEffect, useState } from "react";
import { chat, chatStream, getAllModels } from "@/lib/llm";
import { llmChat } from "./actions";
import {
  Atom,
  Loader2Icon,
  PlayIcon,
  RotateCcwIcon,
  Send,
  SparkleIcon,
  SparklesIcon,
} from "lucide-react";
import { ChatResponse, ListResponse, ModelResponse } from "ollama";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const data = {
  title: "KISAHARI",
  version: "v010",
  footer: {
    left_copy: "A JOURNAL BY N1",
    right_copy: "KISAHARI © 2024",
  },
};

const calcDayProgress = () => {
  // calculate current day relative to the start of the year
  // turn that into a 0-100% value
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  const year = now.getFullYear();
  const daysInYear = year % 4 === 0 ? 366 : 365;
  return (day / daysInYear) * 100;
};

export default function HomePage({ entries }: { entries: Entry[] }) {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [time, setTime] = useState("");
  const [showAI, setShowAI] = useState(true);
  const [models, setModels] = useState<ListResponse>();
  const [model, setModel] = useState<string>("nous-hermes2:latest");

  const ask = async (formData: FormData) => {
    const q = formData.get("q") as string;
    setLoading(true);
    const chat = await llmChat(entries, q);
    setAnswer(chat?.message.content || "");
    setLoading(false);
  };

  const askStream = useCallback(
    async (formData: FormData) => {
      const q = formData.get("q") as string;
      setLoading(true);

      const streams = (await chatStream(entries, q, model)) as AsyncGenerator<
        ChatResponse,
        void,
        unknown
      >;
      let answer = [];
      let chatTime = [""];
      for await (const chat of streams) {
        chatTime = [
          `LOAD:${(chat.load_duration / 1000000000).toFixed(1)}s`,
          `TOTAL:${(chat.total_duration / 1000000000).toFixed(1)}s`,
          `EVAL:${(chat.eval_duration / 1000000000).toFixed(1)}s`,
          `PROMPT:${(chat.prompt_eval_duration / 1000000000).toFixed(1)}s`,
        ];

        answer.push(chat.message.content);
        // const ans = answer.join("").replace(",", "");
        const ans = answer.join("");

        setAnswer(ans);
      }

      setTime(chatTime.join(" "));

      setLoading(false);
    },
    [model]
  );

  useEffect(() => {
    const getModels = async () => {
      const models = await getAllModels();
      setModels(models);
      // console.log(models);
    };
    getModels();
  }, []);

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
      <Header models={models!} setModel={setModel} />
      {/* <div className="flex flex-row justify-between w-full max-w-[95w] items-center py-1 px-4 bg-zinc-800 rounded-full"></div> */}
      <EntriesContainer>
        {entries.map((entry) => (
          <Entry
            key={entry.id}
            date={formatDate(entry.created)}
            title={entry.title}
            content={entry.content}
          />
        ))}
      </EntriesContainer>

      <div className="w-full relative flex flex-row text-xs justify-between items-center">
        <div
          className={cn(
            "flex flex-row self-start max-w-[95vw] py-2 px-4  bg-lime-400 rounded-[2px]  text-zinc-800",
            `w-[${calcDayProgress()}vw]`
            // `w-[92vw]`
          )}
        ></div>
        <span
          className={cn(
            calcDayProgress() > 92 ? "text-zinc-800" : "text-lime-400",
            "absolute right-6 font-medium text-[0.9em]"
          )}
        >
          {calcDayProgress().toFixed(1)}%
        </span>
      </div>
      {showAI && (
        <AIChat
          {...{
            answer,
            time,
            loading,
            askStream,
            setAnswer,
            setTime,
            setLoading,
          }}
        />
      )}
      {/* {!showAI && ( */}
      <div
        onClick={() => {
          setShowAI(!showAI);
        }}
        className={cn(
          "absolute right-8 top-[15vh] bg-zinc-800 group transition-colors ease-in-out duration-200 hover:bg-lime-500 px-2 py-2 rounded-l-md",
          showAI && "bg-lime-500 hover:bg-zinc-800 "
        )}
      >
        <Atom
          className={cn(
            "w-4 h-4 text-zinc-800 hover:text-lime-500 transition-colors ease-in-out duration-200 group-hover:text-lime-500",
            !showAI && "text-lime-500 group-hover:text-zinc-800"
          )}
        />
      </div>
      {/* )} */}

      <Footer />
    </Container>
  );
}

export const Spacer = () => <div className="spacer my-1"></div>;

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex relative flex-col min-h-screen items-center justify-between w-full h-full p-8 bg-zinc-100/15 dark:bg-zinc-900/10 font-extralight z-10 max-h-screen">
      {children}
    </main>
  );
};

const EntriesContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex-1 relative h-full flex flex-col gap-4 p-8 sm:p-16 items-start w-full ring-1 ring-zinc-700
      overflow-y-auto max-h-[82vh] rounded-sm scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
    >
      {children}
    </div>
  );
};

const Entry = ({
  date,
  title,
  content,
}: {
  date: string;
  title: string;
  content: string;
}) => {
  const [closed, setClosed] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          setClosed(!closed);
        }}
        className="flex flex-row items-center gap-2 group cursor-pointer hover:text-lime-300 hover:animate-pulse transition-colors duration-200 ease-in-out"
      >
        <div className="p-3 scale-50 ring-2 ring-zinc-500 group-hover:bg-lime-500 group-hover:ring-0 group-hover:animate-pulse rounded-full" />
        <div
          className={cn(
            "uppercase text-zinc-500 group-hover:text-lime-300",
            !closed && "text-zinc-200"
          )}
        >
          {date}
        </div>
      </div>
      {!closed && (
        <div
          className="sm:border-l-2 pl-2 sm:pl-8 sm:ml-3 flex flex-col gap-4 text-sm
          text-zinc-300 whitespace-pre-line"
        >
          <Spacer />
          <h1 className="uppercase text-xl -ml-1 font-light">{title}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="whitespace-pre-line max-w-prose text-sm text-zinc-300"
          />
          <Spacer />
        </div>
      )}
    </>
  );
};

const Header = ({
  models,
  setModel,
}: {
  models: ListResponse;
  setModel: (model: string) => void;
}) => {
  return (
    <div className="flex flex-row justify-between w-full items-center ring-1 ring-zinc-700 px-6 py-2 rounded-t-xl rounded-b-sm">
      <div className="flex-1 flex flex-row gap-2">
        <h1 className="text-xl font-normal">[{data.title}]</h1>
        <span className="self-end text-sm">{data.version}</span>
      </div>
      <div className="flex flex-row items-center gap-4">
        {/* {JSON.stringify(models?.models.map((m) => m.name))} */}
        <Select
          onValueChange={(value) => {
            setModel(value);
          }}
        >
          <SelectTrigger className="min-w-fit text-xs uppercase bg-transparent">
            <SelectValue className="" placeholder="Models" />
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

        <div className="uppercase py-2">
          <CurrentTime />
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="flex flex-row justify-between w-full items-center ring-1 ring-zinc-700 px-6 py-2 rounded-b-xl rounded-t-sm">
      <div className="text-xs">{data.footer.left_copy}</div>
      <EntryDialog />
      <div className="text-xs">{data.footer.right_copy}</div>
    </div>
  );
};

const AIChat = ({
  answer,
  time,
  loading,
  askStream,
  setAnswer,
  setTime,
  setLoading,
}: {
  answer: string;
  time: string;
  loading: boolean;
  askStream: (formData: FormData) => void;
  setAnswer: (answer: string) => void;
  setTime: (time: string) => void;
  setLoading: (loading: boolean) => void;
}) => {
  return (
    <div className="absolute inset-0 flex flex-col items-end justify-start top-16 p-16 pointer-events-none">
      <div className="px-4 py-2 rounded-md flex flex-col justify-evenly items-center w-full max-w-md pointer-events-auto">
        <form className="w-full p-4" action={askStream}>
          <div className="flex flex-row w-full gap-4 justify-between">
            <input
              autoFocus
              type="text"
              name="q"
              autoComplete="off"
              placeholder="Ask me anything"
              className="max-w-prose w-full text-xs bg-transparent focus:outline-none break-words ring-zinc-400 ring-1 px-3 py-2 rounded-lg"
            />
            <button
              onClick={() => {
                setAnswer("");
                setTime("");
              }}
              type="reset"
            >
              <RotateCcwIcon className="w-5 h-5 text-zinc-600 hover:text-zinc-300" />
            </button>
            <button
              onClick={() => {
                setLoading(true);
                setAnswer("");
                setTime("");
              }}
              type="submit"
            >
              {!loading ? (
                <SparklesIcon className="w-5 h-5 text-zinc-300 hover:text-lime-500" />
              ) : (
                <Loader2Icon className="w-5 h-5 text-zinc-300 hover:text-lime-500 animate-spin" />
              )}
            </button>
          </div>
        </form>

        {answer.length > 1 && (
          <div className="whitespace-pre-line self-start prose prose-zinc break-words max-w-prose max-h-[50vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-lime-500 scrollbar-track-transparent text-sm text-zinc-300 p-4">
            {answer}
          </div>
        )}
        {loading && (
          <div className="max-w-prose text-xs self-start text-zinc-500 p-4 ">
            <div className="animate-pulse uppercase">
              {answer.length < 1 ? "thinking" : "streaming answers"}
            </div>
          </div>
        )}
        {time && (
          <div className="max-w-prose self-start text-xs text-zinc-500 p-4">
            <div className="">{time}</div>
          </div>
        )}
      </div>
    </div>
  );
};
