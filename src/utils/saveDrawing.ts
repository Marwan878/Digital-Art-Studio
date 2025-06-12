import { Shape } from "../classes";
import type { SavedDrawing } from "../types";
import deleteDrawing from "./deleteDrawing";
import getSavedDrawings from "./getSavedDrawings";

const saveDrawing = (
  canvas: HTMLCanvasElement,
  shapes: Shape[],
  name: string,
  id: string
): Promise<string> => {
  const img = new Image();

  return new Promise<string>((resolve) => {
    img.onload = () => {
      const thumbnailCanvas = document.createElement("canvas");
      const context = thumbnailCanvas.getContext("2d");

      if (!context) {
        throw new Error("Failed to get context");
      }

      thumbnailCanvas.width = 200;
      thumbnailCanvas.height = 150;

      fillCanvasWithWhite(context, thumbnailCanvas);
      fillCanvasWithImage(context, img, thumbnailCanvas);

      deleteDrawingIfAlreadyExists(id);
      updateDrawings(id, name, shapes, thumbnailCanvas);

      resolve(id);
    };

    const originalImageData = canvas.toDataURL("image/png");
    img.src = originalImageData;
  });
};

const fillCanvasWithWhite = (
  context: CanvasRenderingContext2D,
  thumbnailCanvas: HTMLCanvasElement
): void => {
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, thumbnailCanvas.width, thumbnailCanvas.height);
};

const fillCanvasWithImage = (
  context: CanvasRenderingContext2D,
  img: HTMLImageElement,
  thumbnailCanvas: HTMLCanvasElement
): void => {
  context.drawImage(img, 0, 0, thumbnailCanvas.width, thumbnailCanvas.height);
};

const deleteDrawingIfAlreadyExists = (id: string): void => {
  const existingDrawings = getSavedDrawings();
  if (existingDrawings.find((drawing) => drawing.id === id)) {
    deleteDrawing(id);
  }
};

const updateDrawings = (
  id: string,
  name: string,
  shapes: Shape[],
  thumbnailCanvas: HTMLCanvasElement
): void => {
  const drawing: SavedDrawing = {
    id,
    name,
    timestamp: Date.now(),
    shapes: JSON.stringify(shapes),
    thumbnail: thumbnailCanvas.toDataURL("image/png"),
  };

  const updatedDrawings = [...getSavedDrawings(), drawing];
  localStorage.setItem(
    "digitalArtStudio-drawings",
    JSON.stringify(updatedDrawings)
  );
};

export default saveDrawing;
