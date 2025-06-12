import type { TStyleConfiguration } from "../types";
import Shape from "./Shape";

class Rectangle extends Shape {
  public width: number;
  public height: number;

  constructor(startX: number, startY: number, style: TStyleConfiguration) {
    super(startX, startY, style, "rectangle");
    this.width = 0;
    this.height = 0;
  }

  update(currentX: number, currentY: number): void {
    this.width = currentX - this.startX;
    this.height = currentY - this.startY;
  }

  draw(context: CanvasRenderingContext2D): void {
    context.strokeStyle = this.style.color;
    context.lineWidth = this.style.lineWidth;

    context.strokeRect(this.startX, this.startY, this.width, this.height);
  }
}

export default Rectangle;
