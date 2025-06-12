import type { SavedDrawing } from "../../types";

interface DrawingCardProps {
  drawing: SavedDrawing;
  onSelect: (drawing: SavedDrawing) => void;
  formatDate: (timestamp: number) => string;
}

const DrawingCard = ({ drawing, onSelect, formatDate }: DrawingCardProps) => {
  return (
    <button
      key={drawing.id}
      className="bg-white/15 backdrop-blur rounded-xl border border-white/20 overflow-hidden hover:bg-white/20 transition-all duration-200 cursor-pointer group shadow-lg"
      onClick={() => onSelect(drawing)}
    >
      <div className="aspect-video bg-white/5 flex items-center justify-center overflow-hidden">
        <img
          src={drawing.thumbnail}
          alt={drawing.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-white truncate mb-1">
          {drawing.name}
        </h3>
        <p className="text-sm text-purple-200">
          {formatDate(drawing.timestamp)}
        </p>
      </div>
    </button>
  );
};

export default DrawingCard;
