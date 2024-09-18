import "./App.css";
import Gallery from "./components/gallery";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div>
      <Toaster richColors position="top-center" />
      <Gallery />
    </div>
  );
}

export default App;
