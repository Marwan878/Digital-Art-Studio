import getSavedDrawings from "./getSavedDrawings";

const deleteDrawing = (id: string): void => {
  const drawings = getSavedDrawings().filter((drawing) => drawing.id !== id);
  localStorage.setItem("digitalArtStudio-drawings", JSON.stringify(drawings));
};

export default deleteDrawing;
