import type { SavedDrawing } from "../types";
import getSavedDrawings from "./getSavedDrawings";

const loadDrawing = (id: string): SavedDrawing | null => {
  const drawings = getSavedDrawings();
  return drawings.find((drawing) => drawing.id === id) || null;
};

export default loadDrawing;
