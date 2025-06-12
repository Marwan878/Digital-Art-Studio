import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IntroPage from "./components/pages/IntroPage";
import CanvasPage from "./components/pages/CanvasPage";
import GalleryPage from "./components/pages/GalleryPage";

import "./main.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/canvas" element={<CanvasPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
