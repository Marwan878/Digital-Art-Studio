import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { SavedDrawing } from "../../types";
import { formatDate, getSavedDrawings } from "../../utils";
import DrawingCard from "../gallery/DrawingCard";
import DrawingModal from "../gallery/DrawingModal";
import EmptyState from "../gallery/EmptyState";
import GalleryHeader from "../gallery/GalleryHeader";
import Header from "../shared/Header";
import Layout from "../shared/Layout";

const GalleryPage = () => {
  const [drawings, setDrawings] = useState<SavedDrawing[]>([]);
  const [selectedDrawing, setSelectedDrawing] = useState<SavedDrawing | null>(
    null
  );

  useEffect(() => {
    setDrawings(getSavedDrawings());
  }, []);

  const headerActions = (
    <>
      <Link
        to="/canvas"
        className="bg-white/20 backdrop-blur text-white px-4 py-2 rounded-lg font-medium border border-white/30 hover:bg-white/30 transition-all duration-200"
      >
        New Drawing
      </Link>
      <Link
        to="/"
        className="text-white hover:text-white/80 transition-colors px-4 py-2"
      >
        Home
      </Link>
    </>
  );

  return (
    <Layout>
      <Header actions={headerActions} />

      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <GalleryHeader drawings={drawings} />

          {drawings.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {drawings.map((drawing) => (
                <DrawingCard
                  key={drawing.id}
                  drawing={drawing}
                  onSelect={setSelectedDrawing}
                  formatDate={formatDate}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {selectedDrawing && (
        <DrawingModal
          drawing={selectedDrawing}
          onClose={() => setSelectedDrawing(null)}
          formatDate={formatDate}
          setDrawings={setDrawings}
          setSelectedDrawing={setSelectedDrawing}
        />
      )}
    </Layout>
  );
};

export default GalleryPage;
