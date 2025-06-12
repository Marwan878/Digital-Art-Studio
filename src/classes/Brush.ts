import type { TPoint, TStyleConfiguration } from "../types";
import Shape from "./Shape";

class Brush extends Shape {
  public points: TPoint[];

  constructor(startX: number, startY: number, style: TStyleConfiguration) {
    super(startX, startY, style, "brush");
    this.points = [{ x: startX, y: startY }];
  }

  update(currentX: number, currentY: number): void {
    this.points.push({ x: currentX, y: currentY });
  }

  draw(context: CanvasRenderingContext2D): void {
    if (this.points.length < 2) return;

    context.strokeStyle = this.style.color;
    context.lineWidth = this.style.lineWidth;
    context.lineCap = "round";
    context.lineJoin = "round";

    context.beginPath();
    context.moveTo(this.points[0].x, this.points[0].y);

    for (const point of this.points) {
      context.lineTo(point.x, point.y);
    }

    context.stroke();
  }
}

export default Brush;
