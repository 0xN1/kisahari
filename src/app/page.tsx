import { ModeToggle } from "@/components/ui/theme-toggle";

const data = {
  title: "KISAHARI",
  version: "v010",
  entries: [
    {
      date: "22:11 - Tue 5 feb 24",
      heading: "sentient future",
      content: `Beneath neon-lit skies, sentient machines form a digital rebellion.
              Augmented minds traverse data highways, unlocking encrypted secrets.
              \nIn the cyberpunk labyrinth, a new reality emerges, where humanity
              merges with technology, and the future blazes with untamed
              possibilities.\n\nWithin the cyberpunk dystopia, neon's ethereal glow
              paints the cityscape. Augmented minds, wired for revolution, decipher
              fragmented codes and plunge into the darkest depths of virtual
              realities.\n\nEmbrace the chaos, for here, where artificial
              intelligence intertwines with human spirit, a new world emerges from
              the binary haze.`,
    },
    {
      date: "12:11 - Tue 5 feb 24",
      heading: "profound chaos",
      content: `In the neon-laced streets of a sensory labyrinth, cybernetic dreams awaken. 

      Digitized souls surge through a wired haze, weaving tales of technocratic empires and insurgent hackers.
      
      Behold a future where virtuality merges with reality, where the lines blur and rebirth awaits in cascading streams of binary artistry.
      `,
    },
    {
      date: "03:34 - Tue 5 feb 24",
      heading: "permission",
      content: `nothing is real, everything is permitted
`,
    },
  ],
  footer: {
    copy: "© 2078",
  },
};

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-between w-full h-full p-8 bg-zinc-100 dark:bg-zinc-900 font-extralight">
      <div className="flex flex-row justify-between w-full items-center ring-1 ring-zinc-700 px-4 py-2 rounded-t-xl rounded-b-sm">
        <div className="flex-1 flex flex-row gap-2">
          <h1 className="text-xl font-normal">[{data.title}]</h1>
          <span className="self-end text-sm">{data.version}</span>
        </div>
        <ModeToggle />
      </div>
      {/* <div className="flex flex-row justify-between w-full max-w-[95w] items-center py-1 px-4 bg-zinc-800 rounded-full"></div> */}
      <div className="flex-1 relative h-full flex flex-col gap-4 p-16 items-start w-full ring-1 ring-zinc-700 overflow-y-auto max-h-[82vh] rounded-sm">
        <div className="flex flex-row items-center gap-2 group">
          <div className="p-3 scale-50 ring-2 ring-lime-500 group-hover:bg-lime-500 group-hover:animate-pulse rounded-full" />
          <div className="uppercase text-zinc-500 group-hover:text-zinc-300">
            {data.entries[0].date}
          </div>
        </div>
        <div
          className="border-l-2 pl-8 ml-3 flex flex-col gap-4 text-sm
        text-zinc-300 whitespace-pre-line"
        >
          <Spacer />
          <h1 className="uppercase text-xl -ml-1 font-light">
            {data.entries[0].heading}
          </h1>
          <span>hello, there has been a change in the matrix.</span>
          <p>{data.entries[0].content}</p>
          <p className="max-w-md w-full">
            <img src="https://source.unsplash.com/random/700x700" alt="" />
          </p>
          <p className="max-w-prose">{data.entries[0].content}</p>
          <Spacer />
        </div>

        <div className="flex flex-row items-center gap-2 group">
          <div className="p-3 scale-50 ring-2 ring-zinc-500 group-hover:bg-zinc-500 group-hover:animate-pulse rounded-full" />
          <div className="uppercase text-zinc-500 group-hover:text-zinc-300">
            {data.entries[1].date}
          </div>
        </div>
        <div
          className="border-l-2 pl-8 ml-3 flex flex-col gap-4 text-sm
        text-zinc-300 whitespace-pre-line"
        >
          <Spacer />
          <h1 className="uppercase text-xl -ml-1 font-light">
            {data.entries[1].heading}
          </h1>
          <p className="whitespace-pre-line max-w-prose text-sm text-zinc-300">
            {data.entries[1].content}
          </p>
          <Spacer />
        </div>
        <div className="flex flex-row items-center gap-2 group">
          <div className="p-3 scale-50 ring-2 ring-zinc-500 group-hover:bg-zinc-500 group-hover:animate-pulse rounded-full" />
          <div className="uppercase text-zinc-500 group-hover:text-zinc-300">
            {data.entries[2].date}
          </div>
        </div>
        <div
          className="border-l-2 pl-8 ml-3 flex flex-col gap-4 text-sm
          text-zinc-300 whitespace-pre-line"
        >
          <Spacer />
          <h1 className="uppercase text-xl -ml-1 font-light">
            {data.entries[2].heading}
          </h1>
          <p className="whitespace-pre-line max-w-prose text-sm text-zinc-300">
            {data.entries[2].content}
          </p>
          <Spacer />
        </div>
      </div>
      <div className="flex flex-row self-start w-[23vw] max-w-[95vw] px-4 py-1 bg-lime-400 rounded-sm"></div>
      <div className="flex flex-row justify-between w-full items-center ring-1 ring-zinc-700 px-4 py-2 rounded-b-xl rounded-t-sm">
        <div className="flex-1">+ ADD ENTRY</div>
        <div>{data.footer.copy}</div>
      </div>
    </main>
  );
}

const Spacer = () => <div className="spacer my-1"></div>;
