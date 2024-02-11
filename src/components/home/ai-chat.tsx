import { Loader2Icon, RotateCcwIcon, SparklesIcon } from "lucide-react";

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
        <form
          className="w-full p-4"
          onSubmit={(e) => {
            e.preventDefault();
            askStream(new FormData(e.target as HTMLFormElement));
          }}
        >
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

export default AIChat;
