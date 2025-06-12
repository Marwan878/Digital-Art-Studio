import type { TStyleConfiguration, TToolName } from "../types";

abstract class Shape {
  public startX: number;
  public startY: number;
  public style: TStyleConfiguration;
  public isComplete: boolean;
  public toolName: TToolName;

  constructor(
    startX: number,
    startY: number,
    style: TStyleConfiguration,
    toolName: TToolName
  ) {
    this.startX = startX;
    this.startY = startY;
    this.style = { ...style };
    this.isComplete = false;
    this.toolName = toolName;
  }

  abstract update(currentX: number, currentY: number): void;
  abstract draw(context: CanvasRenderingContext2D): void;
}

export default Shape;
