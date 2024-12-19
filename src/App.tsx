import "./App.css";
import { Toaster } from "./components/ui/sonner";
import { BrowserRouter as Router } from "react-router-dom";
import InternalRoutes from "./routes/internal-routes";
import ExternalRoutes from "./routes/external-routes";
import { setBaseUrl, setDefaultHeaders } from "./helpers/axios-helper";

function App() {
  const token = localStorage.getItem("@token");

  setBaseUrl();

  if (!token) {
    return (
      <>
        <Toaster richColors position="top-center" />
        <Router>
          <ExternalRoutes />
        </Router>
      </>
    );
  }

  setDefaultHeaders(token);

  return (
    <div>
      <Toaster richColors position="top-center" />
      <Router>
        <InternalRoutes />
      </Router>
    </div>
  );
}

export default App;
