import { useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { TOOLS } from "../../constants";
import useCanvas from "../../hooks/useCanvas";
import type { TToolName } from "../../types";
import { saveDrawing } from "../../utils/storage";
import Canvas from "../canvas/Canvas";
import SaveDialog from "../canvas/SaveDialog";
import Header from "../shared/Header";
import Layout from "../shared/Layout";
import Sidebar from "../sidebar/Sidebar";

const CanvasPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeTool, setActiveTool] = useState<TToolName>(TOOLS[0].tool);
  const [lineWidth, setLineWidth] = useState(5);
  const [selectedColor, setSelectedColor] = useState("#000");

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [drawingName, setDrawingName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [searchParams] = useSearchParams();
  const urlPaintingId = searchParams.get("load");

  const canvasData = useCanvas(urlPaintingId ?? "");

  const handleSaveDrawing = async () => {
    if (!canvasRef.current || !drawingName.trim()) {
      alert("Please enter a name for your drawing");
      return;
    }

    setIsSaving(true);
    try {
      await saveDrawing(
        canvasRef.current,
        canvasData.shapes,
        drawingName.trim(),
        urlPaintingId ?? `drawing-${Date.now()}`
      );
      setShowSaveDialog(false);
      setDrawingName("");
      alert("Drawing saved successfully!");
    } catch (error) {
      console.error("Error saving drawing:", error);
      alert("Failed to save drawing. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const openSaveDialog = () => {
    if (!drawingName) {
      const timestamp = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      setDrawingName(`Drawing ${timestamp}`);
    }
    setShowSaveDialog(true);
  };

  const headerActions = (
    <>
      <button
        onClick={openSaveDialog}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors cursor-pointer"
      >
        💾 Save
      </button>
      <Link
        to="/gallery"
        className="bg-white/20 backdrop-blur text-white px-4 py-2 rounded-lg font-medium border border-white/30 hover:bg-white/30 transition-all duration-200"
      >
        🖼️ Gallery
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

      <main className="flex flex-1 gap-4 p-4">
        <Sidebar
          canvasRef={canvasRef}
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          lineWidth={lineWidth}
          setLineWidth={setLineWidth}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />

        <section className="flex-1 flex flex-col gap-4">
          <Canvas
            canvasRef={canvasRef}
            lineWidth={lineWidth}
            activeTool={activeTool}
            selectedColor={selectedColor}
            {...canvasData}
          />
        </section>
      </main>

      <SaveDialog
        isOpen={showSaveDialog}
        drawingName={drawingName}
        isSaving={isSaving}
        onClose={() => setShowSaveDialog(false)}
        onSave={handleSaveDrawing}
        onNameChange={setDrawingName}
      />
    </Layout>
  );
};

export default CanvasPage;
