import type { Dispatch, SetStateAction } from "react";

interface SaveButtonProps {
  drawingName: string;
  setDrawingName: Dispatch<SetStateAction<string>>;
  setShowSaveDialog: Dispatch<SetStateAction<boolean>>;
}

const SaveButton = ({
  drawingName,
  setDrawingName,
  setShowSaveDialog,
}: SaveButtonProps) => {
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
  return (
    <button
      onClick={openSaveDialog}
      className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors cursor-pointer"
    >
      💾 Save
    </button>
  );
};

export default SaveButton;
