import { Rectangle, Shape, Text } from "../classes";
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

    if (shape.toolName === "text") {
      const rectangle = new Rectangle(shape.startX, shape.startY, shape.style);

      Object.assign(rectangle, (shape as Text).rectangle);
      (genericShape as Text).rectangle = rectangle;
      (genericShape as Text).onComplete();
    }

    return genericShape;
  });
}
