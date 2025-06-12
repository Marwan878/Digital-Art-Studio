import {
  Shape,
  Circle,
  Freehand,
  Line,
  Rectangle,
  Text,
} from "../classes/index";
import Spray from "../classes/Spray";
import Stamp from "../classes/Stamp";
import type { TStyleConfiguration, TToolName } from "../types";

const createShape = (
  tool: TToolName,
  startX: number,
  startY: number,
  style: TStyleConfiguration
): Shape => {
  switch (tool) {
    case "line":
      return new Line(startX, startY, style);
    case "rectangle":
      return new Rectangle(startX, startY, style);
    case "circle":
      return new Circle(startX, startY, style);
    case "brush":
      return new Freehand(startX, startY, style);
    case "pencil": {
      const originalLineWidth = style.lineWidth;
      return new Freehand(startX, startY, {
        ...style,
        lineWidth: Math.min(1, originalLineWidth / 2),
      });
    }
    case "stamp":
      return new Stamp(startX, startY, style);
    case "eraser":
      return new Freehand(startX, startY, { ...style, color: "#fff" });
    case "spray":
      return new Spray(startX, startY, style);
    case "text":
      return new Text(startX, startY, style);
    default:
      throw new Error(`Unknown tool: ${tool}`);
  }
};

export default createShape;
