import { Link } from "react-router-dom";

const EmptyState = () => {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">🎨</div>
      <h3 className="text-xl font-semibold text-white mb-4">No drawings yet</h3>
      <p className="text-purple-100 mb-8">
        Create your first masterpiece to start building your gallery.
      </p>
      <Link
        to="/canvas"
        className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all duration-200 shadow-lg inline-block"
      >
        Start Drawing
      </Link>
    </div>
  );
};

export default EmptyState;
