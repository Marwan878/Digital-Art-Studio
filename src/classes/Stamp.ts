import { EMOJIS } from "../constants";
import type { TStyleConfiguration } from "../types";
import Shape from "./Shape";

class Stamp extends Shape {
  public readonly emoji: string;
  private static upcomingStampIndex: number = 0;

  constructor(startX: number, startY: number, style: TStyleConfiguration) {
    super(startX, startY, style, "stamp");

    if (Stamp.upcomingStampIndex >= EMOJIS.length) {
      Stamp.upcomingStampIndex = 0;
    }

    this.emoji = EMOJIS[Stamp.upcomingStampIndex];

    Stamp.upcomingStampIndex++;
  }

  update(currentX: number, currentY: number): void {
    return;
  }

  draw(context: CanvasRenderingContext2D): void {
    context.font = this.style.font;

    context.fillText(this.emoji, this.startX, this.startY);
    context.stroke();
  }
}

export default Stamp;
