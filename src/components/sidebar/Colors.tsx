export default function Colors({
  canvasRef,
  selectedColor,
  setSelectedColor,
}: {
  readonly canvasRef: React.RefObject<HTMLCanvasElement | null>;
  readonly selectedColor: string;
  readonly setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleColorChange = (color: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.strokeStyle = color;
    setSelectedColor(color);
  };

  return (
    <section className="mb-8">
      <h3 className="mb-4 text-gray-800 text-lg border-b-2 border-indigo-500 pb-2">
        Colors
      </h3>
      <div className="grid grid-cols-6 gap-2 mb-4">
        {[
          "#000000",
          "#ff0000",
          "#00ff00",
          "#0000ff",
          "#ffff00",
          "#ff00ff",
          "#00ffff",
          "#ffffff",
          "#800080",
          "#ffa500",
          "#ffc0cb",
          "#8b4513",
        ].map((color) => (
          <button
            key={color}
            onClick={() => handleColorChange(color)}
            className={`w-[35px] h-[35px] rounded-full border-2 ${
              color === selectedColor
                ? "border-gray-800 scale-110 shadow-md"
                : "border-gray-300"
            } hover:scale-110 transition cursor-pointer`}
            style={{ backgroundColor: color }}
          ></button>
        ))}
      </div>
    </section>
  );
}
