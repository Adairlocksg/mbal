import Login from "@/pages/login";
import { Route, Routes } from "react-router-dom";

const ExternalRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
    </Routes>
  );
};

export default ExternalRoutes;
