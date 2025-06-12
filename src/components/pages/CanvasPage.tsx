import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TOOLS } from "../../constants";
import useCanvas from "../../hooks/useCanvas";
import type { TToolName } from "../../types";
import Canvas from "../canvas/Canvas";
import SaveButton from "../canvas/SaveButton";
import SaveDialog from "../canvas/SaveDialog";
import Header from "../shared/Header";
import Layout from "../shared/Layout";
import Sidebar from "../sidebar/Sidebar";

const CanvasPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeTool, setActiveTool] = useState<TToolName>(TOOLS[0].tool);
  const [lineWidth, setLineWidth] = useState(5);
  const [selectedColor, setSelectedColor] = useState("#000000");

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [drawingName, setDrawingName] = useState("");

  const canvasData = useCanvas();

  const headerActions = (
    <>
      <SaveButton
        drawingName={drawingName}
        setDrawingName={setDrawingName}
        setShowSaveDialog={setShowSaveDialog}
      />
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
        canvasRef={canvasRef}
        shapes={canvasData.shapes}
        urlPaintingId={canvasData.urlPaintingId ?? ""}
        setShowSaveDialog={setShowSaveDialog}
        setDrawingName={setDrawingName}
        isOpen={showSaveDialog}
        drawingName={drawingName}
        onNameChange={setDrawingName}
        onClose={() => setShowSaveDialog(false)}
      />
    </Layout>
  );
};

export default CanvasPage;
