import AddImage from "@/pages/add-image";
import Gallery from "@/pages/gallery";
import { Route, Routes } from "react-router-dom";

const InternalRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Gallery />}></Route>
      <Route path="/add-image" element={<AddImage />}></Route>
      <Route path="/edit-image/:id" element={<AddImage />}></Route>
    </Routes>
  );
};

export default InternalRoutes;
