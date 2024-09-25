import "./App.css";
import Gallery from "./pages/gallery";
import { Toaster } from "./components/ui/sonner";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddImage from "./pages/add-image";

function App() {
  return (
    <div>
      <Toaster richColors position="top-center" />
      <Router>
        <Routes>
          <Route path="/" element={<Gallery />}></Route>
          <Route path="/add-image" element={<AddImage />}></Route>
          <Route path="/edit-image/:id" element={<AddImage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
