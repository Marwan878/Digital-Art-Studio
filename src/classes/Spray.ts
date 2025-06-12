import type { TPoint, TStyleConfiguration } from "../types";
import Shape from "./Shape";

class Spray extends Shape {
  public points: TPoint[];
  private readonly density: number;

  constructor(startX: number, startY: number, style: TStyleConfiguration) {
    super(startX, startY, style, "spray");
    this.points = [];
    this.density = 10;
  }

  update(currentX: number, currentY: number): void {
    this.startX = currentX;
    this.startY = currentY;

    for (let i = 0; i < this.density; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const radius = (this.style.lineWidth / 2) * Math.random();

      const x = this.startX + radius * Math.cos(angle);
      const y = this.startY + radius * Math.sin(angle);
      this.points.push({ x, y });
    }
  }

  draw(context: CanvasRenderingContext2D): void {
    context.strokeStyle = this.style.color;

    for (const point of this.points) {
      context.beginPath();
      context.moveTo(point.x, point.y);
      context.lineTo(point.x, point.y);
      context.stroke();
    }
  }
}

export default Spray;
