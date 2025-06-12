import type { Shape } from "../classes";

export interface SavedDrawing {
  id: string;
  name: string;
  timestamp: number;
  shapes: string;
  thumbnail: string;
}

export const saveDrawing = (
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
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, thumbnailCanvas.width, thumbnailCanvas.height);
      context.drawImage(
        img,
        0,
        0,
        thumbnailCanvas.width,
        thumbnailCanvas.height
      );

      const existingDrawings = getSavedDrawings();
      if (existingDrawings.find((drawing) => drawing.id === id)) {
        deleteDrawing(id);
      }

      const drawing: SavedDrawing = {
        id,
        name,
        timestamp: Date.now(),
        shapes: JSON.stringify(shapes),
        thumbnail: thumbnailCanvas.toDataURL("image/jpeg"),
      };

      const updatedDrawings = [...getSavedDrawings(), drawing];
      localStorage.setItem(
        "digitalArtStudio-drawings",
        JSON.stringify(updatedDrawings)
      );

      resolve(id);
    };

    const originalImageData = canvas.toDataURL("image/jpeg");
    img.src = originalImageData;
  });
};

export const deleteDrawing = (id: string): void => {
  const drawings = getSavedDrawings().filter((drawing) => drawing.id !== id);
  localStorage.setItem("digitalArtStudio-drawings", JSON.stringify(drawings));
};

export const loadDrawing = (id: string): SavedDrawing | null => {
  const drawings = getSavedDrawings();
  return drawings.find((drawing) => drawing.id === id) || null;
};

export const getSavedDrawings = (): SavedDrawing[] => {
  const stored = localStorage.getItem("digitalArtStudio-drawings");
  return stored ? JSON.parse(stored) : [];
};
