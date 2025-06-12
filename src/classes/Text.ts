import Rectangle from "./Rectangle";
import type { TStyleConfiguration } from "../types";
import Shape from "./Shape";

interface IText {
  onComplete(): void;
}

const PADDING = 5;

class Text extends Shape implements IText {
  public text: string;
  public rectangle: Rectangle;
  private textInput?: HTMLInputElement;
  private hasFocusedOnce = false;

  constructor(startX: number, startY: number, style: TStyleConfiguration) {
    super(startX, startY, style, "text");
    this.text = "";
    this.rectangle = new Rectangle(startX, startY, style);
  }

  update(currentX: number, currentY: number): void {
    this.rectangle.update(currentX, currentY);
  }

  onComplete(): void {
    this.createTextInput();

    if (!this.textInput) throw new Error("TextInput not created");

    document.querySelector("#canvas-container")?.appendChild(this.textInput);

    requestAnimationFrame(() => {
      if (!this.hasFocusedOnce && this.textInput) {
        this.textInput.focus();
        this.hasFocusedOnce = true;
      }
    });
  }

  draw(context: CanvasRenderingContext2D): void {
    this.rectangle.draw(context);
  }

  createTextInput(): void {
    this.textInput = document.createElement("input");
    this.textInput.type = "text";
    this.textInput.style.position = "absolute";
    this.textInput.style.border = `1px solid black`;
    this.textInput.style.color = this.style.color;
    this.textInput.style.width = `${
      Math.abs(this.rectangle.width) - PADDING * 2
    }px`;
    this.textInput.style.height = `${
      Math.abs(this.rectangle.height) - PADDING * 2
    }px`;
    this.textInput.value = this.text;

    this.computeTextInputTopAndLeft();

    this.textInput.addEventListener("change", (e) => {
      this.text = (e.target as HTMLInputElement).value;
    });
  }

  computeTextInputTopAndLeft(): void {
    const rectangleStart = {
      x: this.rectangle.startX,
      y: this.rectangle.startY,
    };
    const rectangleEnd = {
      x: this.rectangle.startX + this.rectangle.width,
      y: this.rectangle.startY + this.rectangle.height,
    };

    if (!this.textInput) return;

    this.textInput.style.left = `${
      Math.min(rectangleStart.x, rectangleEnd.x) + PADDING
    }px`;

    this.textInput.style.top = `${
      Math.min(rectangleStart.y, rectangleEnd.y) + PADDING
    }px`;
  }
}

export default Text;
