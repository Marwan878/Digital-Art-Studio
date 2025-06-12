import type { SavedDrawing } from "../types";

const getSavedDrawings = (): SavedDrawing[] => {
  const stored = localStorage.getItem("digitalArtStudio-drawings");
  return stored ? JSON.parse(stored) : [];
};

export default getSavedDrawings;
