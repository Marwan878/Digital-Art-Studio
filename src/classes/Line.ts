import type { TStyleConfiguration } from "../types";
import Shape from "./Shape";

class Line extends Shape {
  public endX: number;
  public endY: number;

  constructor(startX: number, startY: number, style: TStyleConfiguration) {
    super(startX, startY, style, "line");
    this.endX = startX;
    this.endY = startY;
  }

  update(currentX: number, currentY: number): void {
    this.endX = currentX;
    this.endY = currentY;
  }

  draw(context: CanvasRenderingContext2D): void {
    context.strokeStyle = this.style.color;
    context.lineWidth = this.style.lineWidth;
    context.lineCap = "round";

    context.beginPath();
    context.moveTo(this.startX, this.startY);
    context.lineTo(this.endX, this.endY);
    context.stroke();
  }
}

export default Line;
