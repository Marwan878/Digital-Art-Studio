import type { Shape } from "../classes";
import type { TOOLS } from "../constants";

export type TToolName = (typeof TOOLS)[number]["tool"];

export type TStyleConfiguration = {
  color: string;
  lineWidth: number;
  font: string;
};

export type TPoint = { x: number; y: number };

export type TCanvasState = {
  shapes: Shape[];
  currentShape: Shape | null;
  isDrawing: boolean;
};

export type TAction =
  | { type: "cleared_canvas" }
  | { type: "completed_shape"; payload: Shape }
  | { type: "set_current_shape"; payload: Shape | null }
  | { type: "set_is_drawing"; payload: boolean }
  | { type: "set_shapes"; payload: Shape[] }
  | { type: "undone" };
