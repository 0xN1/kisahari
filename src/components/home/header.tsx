import { ListResponse } from "ollama";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CurrentTime from "@/components/current-time";

const Header = ({
  data,
  models,
  setModel,
}: {
  data: { title: string; version: string };
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
        <Select
          onValueChange={(value) => {
            setModel(value);
          }}
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

        <div className="uppercase py-2">
          <CurrentTime />
        </div>
      </div>
    </div>
  );
};

export default Header;
