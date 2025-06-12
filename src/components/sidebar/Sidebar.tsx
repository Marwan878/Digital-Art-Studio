import type { Dispatch, RefObject, SetStateAction } from "react";
import type { TToolName } from "../../types";
import Colors from "./Colors";
import Settings from "./Settings";
import Toolbar from "./Toolbar";

export default function Sidebar({
  canvasRef,
  activeTool,
  setActiveTool,
  lineWidth,
  setLineWidth,
  selectedColor,
  setSelectedColor,
}: {
  readonly canvasRef: RefObject<HTMLCanvasElement | null>;
  readonly activeTool: TToolName;
  readonly setActiveTool: Dispatch<SetStateAction<TToolName>>;
  readonly lineWidth: number;
  readonly setLineWidth: Dispatch<SetStateAction<number>>;
  readonly selectedColor: string;
  readonly setSelectedColor: Dispatch<SetStateAction<string>>;
}) {
  return (
    <aside className="bg-white/95 backdrop-blur rounded-2xl p-6 w-[280px] h-fit shadow-xl">
      <Toolbar activeTool={activeTool} setActiveTool={setActiveTool} />
      <Colors
        canvasRef={canvasRef}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <Settings
        canvasRef={canvasRef}
        lineWidth={lineWidth}
        setLineWidth={setLineWidth}
      />
    </aside>
  );
}
