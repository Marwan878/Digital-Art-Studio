interface SaveDialogProps {
  isOpen: boolean;
  drawingName: string;
  isSaving: boolean;
  onClose: () => void;
  onSave: () => void;
  onNameChange: (name: string) => void;
}

const SaveDialog = ({
  isOpen,
  drawingName,
  isSaving,
  onClose,
  onSave,
  onNameChange,
}: SaveDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center p-4 z-50">
      <div className="bg-white/15 backdrop-blur rounded-xl border border-white/20 p-6 max-w-md w-full shadow-2xl">
        <h3 className="text-lg font-semibold text-white mb-4">
          Save Your Drawing
        </h3>
        <input
          type="text"
          value={drawingName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter drawing name..."
          className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-white/60 mb-4"
          autoFocus
        />
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="px-4 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={isSaving || !drawingName.trim()}
            className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save Drawing"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveDialog;
