import Rectangle from "./Rectagnle";
import type { TStyleConfiguration } from "../types";
import Shape from "./Shape";

const PADDING = 10;

class Text extends Shape {
  public text: string;
  private readonly rectangle: Rectangle;
  private readonly textInput: HTMLInputElement;

  constructor(startX: number, startY: number, style: TStyleConfiguration) {
    super(startX, startY, style, "text");
    this.text = "";
    this.rectangle = new Rectangle(startX, startY, style);

    this.textInput = document.createElement("input");
    this.textInput.type = "text";
    this.textInput.style.position = "absolute";
    this.textInput.style.zIndex = "1000";
    this.textInput.style.border = "1px solid #ccc";
    this.textInput.style.background = "white";
    this.textInput.style.fontSize = "14px";
    this.textInput.style.pointerEvents = "auto";

    // Calculate proper position relative to canvas container
    const containerPadding = 16; // From the p-4 class (1rem = 16px)
    this.textInput.style.top = `${startY + containerPadding}px`;
    this.textInput.style.left = `${startX + containerPadding}px`;

    this.textInput.addEventListener("change", (e) => {
      this.text = (e.target as HTMLInputElement).value;
    });

    this.textInput.addEventListener("input", (e) => {
      this.text = (e.target as HTMLInputElement).value;
    });

    document.querySelector("#canvas-container")?.appendChild(this.textInput);
  }

  update(currentX: number, currentY: number): void {
    this.rectangle.update(currentX, currentY);

    // Update input position and size
    const containerPadding = 16; // From the p-4 class
    this.textInput.style.top = `${
      Math.min(this.startY, currentY) + containerPadding
    }px`;
    this.textInput.style.left = `${
      Math.min(this.startX, currentX) + containerPadding
    }px`;
    this.textInput.style.width = `${
      Math.abs(this.rectangle.width) - PADDING * 2
    }px`;
    this.textInput.style.height = `${
      Math.abs(this.rectangle.height) - PADDING * 2
    }px`;
  }

  draw(context: CanvasRenderingContext2D): void {
    this.rectangle.draw(context);

    // If the shape is complete and we have text, draw it on the canvas
    if (this.isComplete && this.text) {
      context.font = this.style.font;
      context.fillStyle = this.style.color;
      context.fillText(
        this.text,
        this.startX + PADDING,
        this.startY + PADDING + 16 // Offset for text baseline
      );
    }
  }

  // Add cleanup method
  cleanup(): void {
    if (this.textInput && this.textInput.parentNode) {
      this.textInput.parentNode.removeChild(this.textInput);
    }
  }
}

export default Text;
