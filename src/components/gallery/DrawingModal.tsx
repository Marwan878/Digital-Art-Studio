import type { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import type { SavedDrawing } from "../../types";
import { deleteDrawing, getSavedDrawings } from "../../utils";

interface DrawingModalProps {
  drawing: SavedDrawing;
  onClose: () => void;
  formatDate: (timestamp: number) => string;
  setDrawings: Dispatch<SetStateAction<SavedDrawing[]>>;
  setSelectedDrawing: Dispatch<SetStateAction<SavedDrawing | null>>;
}

const DrawingModal = ({
  drawing,
  onClose,
  formatDate,
  setDrawings,
  setSelectedDrawing,
}: DrawingModalProps) => {
  const handleDeleteDrawing = (id: string) => {
    if (window.confirm("Are you sure you want to delete this drawing?")) {
      deleteDrawing(id);
      setDrawings(getSavedDrawings());
      setSelectedDrawing(null);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center p-4 z-50">
      <div className="bg-white/15 backdrop-blur rounded-xl border border-white/20 max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-white/20 flex justify-between items-center gap-x-4">
          <div>
            <h3 className="text-lg font-semibold text-white">{drawing.name}</h3>
            <p className="text-sm text-purple-200">
              {formatDate(drawing.timestamp)}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/canvas?load=${drawing.id}`}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDeleteDrawing(drawing.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="bg-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
        <div className="p-4 max-h-[70vh] overflow-auto">
          <img
            src={drawing.thumbnail}
            alt={drawing.name}
            className="w-full h-auto rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default DrawingModal;
