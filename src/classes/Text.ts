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
    this.textInput.style.top = `${startY + PADDING}px`;
    this.textInput.style.left = `${startX + PADDING}px`;
    this.textInput.style.width = `${this.rectangle.width - PADDING * 2}px`;
    this.textInput.style.height = `${this.rectangle.height - PADDING * 2}px`;

    this.textInput.addEventListener("change", (e) => {
      this.text = (e.target as HTMLInputElement).value;
    });

    document.querySelector("#canvas-container")?.appendChild(this.textInput);
  }

  update(currentX: number, currentY: number): void {
    this.rectangle.update(currentX, currentY);
    this.textInput.style.top = `${currentY + PADDING}px`;
    this.textInput.style.left = `${currentX + PADDING}px`;
    this.textInput.style.width = `${this.rectangle.width - PADDING * 2}px`;
    this.textInput.style.height = `${this.rectangle.height - PADDING * 2}px`;
  }

  draw(context: CanvasRenderingContext2D): void {
    this.rectangle.draw(context);
  }
}

export default Text;
