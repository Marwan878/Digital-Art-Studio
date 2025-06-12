import type { TStyleConfiguration } from "../types";
import Shape from "./Shape";

class Circle extends Shape {
  public radius: number;

  constructor(startX: number, startY: number, style: TStyleConfiguration) {
    super(startX, startY, style, "circle");
    this.radius = 0;
  }

  update(currentX: number, currentY: number): void {
    const dx = currentX - this.startX;
    const dy = currentY - this.startY;
    this.radius = Math.sqrt(dx * dx + dy * dy);
  }

  draw(context: CanvasRenderingContext2D): void {
    context.strokeStyle = this.style.color;
    context.lineWidth = this.style.lineWidth;

    context.beginPath();
    context.arc(this.startX, this.startY, this.radius, 0, Math.PI * 2);
    context.stroke();
  }
}

export default Circle;
