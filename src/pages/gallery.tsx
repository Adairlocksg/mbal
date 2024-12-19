import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import GalleryList from "@/components/gallery-list";
import axios from "axios";
import { Image } from "@/types/Image";

export default function Gallery() {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const images = await axios.get<Image[]>("/images");

      setImages(images.data);
    };

    fetchImages();
  }, []);

  return (
    <div className="container mx-auto p-4 bg-background min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-primary">
        Nosso álbum ❤
      </h1>

      <div className="flex justify-between mb-6">
        <Link
          to="/add-image"
          className="bg-primary hover:bg-primary/90 text-primary-foreground flex justify-center items-center px-3 py-2 rounded-sm"
        >
          <PlusCircle className="h-4 w-4 mr-2" /> Adicionar Imagem
        </Link>
      </div>

      <GalleryList images={images} />
    </div>
  );
}

// import { Droppable, Draggable } from "react-beautiful-dnd";
// import { Card, CardContent } from "./ui/card";
// import { GalleryViewProps } from "@/types/Gallery";

// const GalleryList = ({ images }: GalleryViewProps) => {
//   return (
//     <Droppable droppableId="gallery">
//       {(provided) => (
//         <div
//           {...provided.droppableProps}
//           ref={provided.innerRef}
//           className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
//         >
//           {images.map((image, index) => (
//             <Draggable key={index} draggableId={`img_${index}`} index={index}>
//               {(provided, snapshot) => (
//                 <div
//                   ref={provided.innerRef}
//                   {...provided.draggableProps}
//                   {...provided.dragHandleProps}
//                   className={`touch-manipulation ${
//                     snapshot.isDragging ? "opacity-50" : ""
//                   }`}
//                 >
//                   <Card className="border-2 border-border">
//                     <CardContent className="flex aspect-[9/16] items-center justify-center p-2">
//                       <img
//                         src={image}
//                         alt={`Imagem ${index + 1}`}
//                         className="rounded-lg object-cover w-full h-full"
//                       />
//                     </CardContent>
//                   </Card>
//                 </div>
//               )}
//             </Draggable>
//           ))}
//           {provided.placeholder}
//         </div>
//       )}
//     </Droppable>
//   );
// };

// export default GalleryList;
