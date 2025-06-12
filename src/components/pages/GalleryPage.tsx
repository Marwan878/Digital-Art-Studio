import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { SavedDrawing } from "../../types";
import { getSavedDrawings, deleteDrawing } from "../../utils";
import Layout from "../shared/Layout";
import Header from "../shared/Header";
import DrawingCard from "../gallery/DrawingCard";
import EmptyState from "../gallery/EmptyState";
import DrawingModal from "../gallery/DrawingModal";

const GalleryPage = () => {
  const [drawings, setDrawings] = useState<SavedDrawing[]>([]);
  const [selectedDrawing, setSelectedDrawing] = useState<SavedDrawing | null>(
    null
  );

  useEffect(() => {
    setDrawings(getSavedDrawings());
  }, []);

  const handleDeleteDrawing = (id: string) => {
    if (window.confirm("Are you sure you want to delete this drawing?")) {
      deleteDrawing(id);
      setDrawings(getSavedDrawings());
      setSelectedDrawing(null);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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

      {/* Modal for viewing full-size drawing */}
      {selectedDrawing && (
        <DrawingModal
          drawing={selectedDrawing}
          onClose={() => setSelectedDrawing(null)}
          onDelete={handleDeleteDrawing}
          formatDate={formatDate}
        />
      )}
    </Layout>
  );
};

export default GalleryPage;
