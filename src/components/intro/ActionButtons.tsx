import { Link } from "react-router-dom";

const ActionButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        to="/canvas"
        className="bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-purple-700 transition-all duration-200 shadow-lg"
      >
        🎨 Start Creating
      </Link>

      <Link
        to="/gallery"
        className="bg-white/20 backdrop-blur text-white px-8 py-4 rounded-xl font-semibold text-lg border border-white/30 hover:bg-white/30 transition-all duration-200"
      >
        🖼️ View Gallery
      </Link>
    </div>
  );
};

export default ActionButtons;
