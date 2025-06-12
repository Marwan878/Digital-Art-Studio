import { type Dispatch, type SetStateAction } from "react";
import { TOOLS } from "../../constants";
import type { TToolName } from "../../types";

export default function Toolbar({
  activeTool,
  setActiveTool,
}: {
  readonly activeTool: string;
  readonly setActiveTool: Dispatch<SetStateAction<TToolName>>;
}) {
  return (
    <div className="mb-8">
      <h3 className="mb-4 text-gray-800 text-lg border-b-2 border-indigo-500 pb-2">
        Drawing Tools
      </h3>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {TOOLS.map(({ label, tool }) => (
          <button
            onClick={() => setActiveTool(tool)}
            key={tool}
            className={`tool-btn text-sm min-h-[45px] rounded-lg flex items-center justify-center px-3 py-2 cursor-pointer transition duration-300 ${
              tool === activeTool
                ? "bg-gradient-to-br from-red-400 to-orange-500 shadow-md text-white"
                : "bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:-translate-y-0.5 hover:shadow-md"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
