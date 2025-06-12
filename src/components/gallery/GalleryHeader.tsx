import type { SavedDrawing } from "../../types";

interface GalleryHeaderProps {
  drawings: SavedDrawing[];
}

const GalleryHeader = ({ drawings }: GalleryHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-white mb-2">Your Gallery</h1>
      <p className="text-purple-100">
        {drawings.length === 0
          ? "No saved drawings yet. Start creating to build your collection!"
          : `${drawings.length} saved drawing${
              drawings.length === 1 ? "" : "s"
            }`}
      </p>
    </div>
  );
};

export default GalleryHeader;
