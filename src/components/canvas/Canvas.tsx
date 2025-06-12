import {
  useCallback,
  useEffect,
  type MouseEvent,
  type MouseEventHandler,
  type RefObject,
} from "react";
import type { TToolName } from "../../types";
import { createShape } from "../../utils";
import type { Shape } from "../../classes";

export default function Canvas({
  canvasRef,
  lineWidth,
  activeTool,
  selectedColor,
  shapes,
  currentShape,
  isDrawing,
  setCurrentShape,
  setIsDrawing,
  completeShape,
}: {
  readonly canvasRef: RefObject<HTMLCanvasElement | null>;
  readonly lineWidth: number;
  readonly activeTool: TToolName;
  readonly selectedColor: string;
  readonly shapes: Shape[];
  readonly currentShape: Shape | null;
  readonly isDrawing: boolean;
  readonly setCurrentShape: (currentShape: Shape | null) => void;
  readonly setIsDrawing: (isDrawing: boolean) => void;
  readonly completeShape: (currentShape: Shape) => void;
}) {
  const handleMouseDown: MouseEventHandler<HTMLCanvasElement> = (e) => {
    const position = getMousePosition(e);

    setIsDrawing(true);
    const newShape = createShape(activeTool, position.x, position.y, {
      color: selectedColor,
      lineWidth,
      font: "16px arial",
    });
    setCurrentShape(newShape);
  };

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!currentShape) return;

    const position = getMousePosition(e);
    currentShape.update(position.x, position.y);
    redraw();
  };

  const handleMouseUp = () => {
    if (!isDrawing || !currentShape) return;

    completeShape(currentShape);
  };

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    shapes.forEach((shape) => shape.draw(context));

    if (currentShape) {
      currentShape.draw(context);
    }
  }, [shapes, currentShape, canvasRef]);

  const getMousePosition = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const context = canvas.getContext("2d");
    if (!context) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: ((e.clientX - rect.left) * scaleX) / (window.devicePixelRatio || 1),
      y: ((e.clientY - rect.top) * scaleY) / (window.devicePixelRatio || 1),
    };
  };

  useEffect(() => {
    redraw();
  }, [redraw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      context.scale(dpr, dpr);

      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
    };

    setupCanvas();

    const handleResize = () => {
      setupCanvas();
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [canvasRef]);

  return (
    <div
      id="canvas-container"
      className="bg-white rounded-2xl p-4 shadow-xl relative overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="border-2 border-gray-200 rounded-md w-full bg-white cursor-crosshair relative"
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      />
      <div className="absolute top-0 left-0 pointer-events-none z-10"></div>
    </div>
  );
}
