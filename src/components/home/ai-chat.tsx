import { Loader2Icon, RotateCcwIcon, SparklesIcon } from "lucide-react";

const AIChat = ({
  answer,
  time,
  loading,
  askLLM,
  setAnswer,
  setTime,
  setLoading,
}: {
  answer: string;
  time: string;
  loading: boolean;
  askLLM: (formData: FormData) => void;
  setAnswer: (answer: string) => void;
  setTime: (time: string) => void;
  setLoading: (loading: boolean) => void;
}) => {
  return (
    <div
      className="absolute inset-0 flex flex-col items-end justify-start top-[10vh] sm:top-[11vh] py-2 px-2 sm:px-4 md:px-16 pointer-events-none
    from-zinc-900 to-zinc-950/20 bg-gradient-to-b mx-2 sm:mx-0 sm:bg-transparent
    [background:radial-gradient(200%_150%_at_50%_15%,#111_25%,#7d11_100%)] sm:[background:none]"
    >
      <div className="px-2 sm:px-4 py-2 rounded-md flex flex-col justify-evenly items-center w-full max-w-full sm:max-w-md pointer-events-auto">
        <form
          className="w-full p-2 sm:p-4"
          onSubmit={(e) => {
            e.preventDefault();
            askLLM(new FormData(e.target as HTMLFormElement));
          }}
        >
          <div className="flex flex-row w-full gap-2 sm:gap-4 justify-between">
            <input
              autoFocus
              type="text"
              name="q"
              autoComplete="off"
              minLength={1}
              placeholder="Ask me anything"
              className="max-w-prose w-full text-xs bg-transparent focus:outline-none break-words ring-zinc-400 ring-1 px-2 sm:px-3 py-2 rounded-lg"
            />
            <button
              onClick={() => {
                setAnswer("");
                setTime("");
              }}
              type="reset"
            >
              <RotateCcwIcon className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-600 hover:text-zinc-300" />
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
                <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-300 hover:text-lime-500" />
              ) : (
                <Loader2Icon className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-300 hover:text-lime-500 animate-spin" />
              )}
            </button>
          </div>
        </form>

        {answer.length > 1 && (
          <div className="whitespace-pre-line self-start prose prose-zinc break-words max-w-prose max-h-[40vh] sm:max-h-[50vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-lime-500 scrollbar-track-transparent text-xs sm:text-sm text-zinc-300 p-2 sm:p-4">
            {answer}
          </div>
        )}
        {loading && (
          <div className="max-w-prose text-xs self-start text-zinc-500 p-2 sm:p-4">
            <div className="animate-pulse uppercase">
              {answer.length < 1 ? "thinking" : "streaming answers"}
            </div>
          </div>
        )}
        {time && (
          <div className="max-w-prose self-start text-xs text-zinc-500 p-2 sm:p-4">
            <div className="">{time}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChat;
