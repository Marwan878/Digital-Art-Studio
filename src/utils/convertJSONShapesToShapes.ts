import type { Shape } from "../classes";
import createShape from "./createShape";

export default function convertJSONShapesToShapes(shapes: Shape[]) {
  return shapes.map((shape) => {
    const genericShape = createShape(
      shape.toolName,
      shape.startX,
      shape.startY,
      shape.style
    );
    Object.assign(genericShape, shape);
    return genericShape;
  });
}
