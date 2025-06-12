import {
  useState,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";

export default function Settings({
  canvasRef,
  lineWidth,
  setLineWidth,
}: {
  readonly canvasRef: RefObject<HTMLCanvasElement | null>;
  readonly lineWidth: number;
  readonly setLineWidth: Dispatch<SetStateAction<number>>;
}) {
  const [opacityPercentage, setOpacityPercentage] = useState(100);

  const handleBrushSizeChange = (size: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.lineWidth = size;
    setLineWidth(size);
  };

  const handleOpacityPercentageChange = (percentage: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.globalAlpha = percentage / 100;
    setOpacityPercentage(percentage);
  };

  return (
    <section className="mb-8">
      <h3 className="mb-4 text-gray-800 text-lg border-b-2 border-indigo-500 pb-2">
        Settings
      </h3>
      <div className="mb-4">
        <label className="block mb-2 text-gray-600 font-medium">
          Brush Size: {lineWidth}px
        </label>
        <input
          type="range"
          min="1"
          max="50"
          value={lineWidth}
          onChange={(e) => handleBrushSizeChange(+e.target.value)}
          className="w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded outline-none"
        />
      </div>
      <div>
        <label className="block mb-2 text-gray-600 font-medium">
          Opacity: {opacityPercentage}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={opacityPercentage}
          onChange={(e) => handleOpacityPercentageChange(+e.target.value)}
          className="w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded outline-none"
        />
      </div>
    </section>
  );
}
