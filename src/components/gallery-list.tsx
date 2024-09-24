import { Droppable, Draggable } from "react-beautiful-dnd";
import { Card, CardContent } from "./ui/card";
import { GalleryViewProps } from "@/types/Gallery";
/* 
interface ImageItem {
  id: string;
  url: string;
}

interface GalleryListProps {
  images: ImageItem[];
}
 */
const GalleryList = ({ images }: GalleryViewProps) => {
  return (
    <Droppable droppableId="gallery">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {images.map((image, index) => (
            <Draggable key={index} draggableId={`img_${index}`} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`touch-manipulation ${
                    snapshot.isDragging ? "opacity-50" : ""
                  }`}
                >
                  <Card className="border-2 border-border">
                    <CardContent className="flex aspect-[9/16] items-center justify-center p-2">
                      <img
                        src={image}
                        alt={`Imagem ${index + 1}`}
                        className="rounded-lg object-cover w-full h-full"
                      />
                    </CardContent>
                  </Card>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default GalleryList;
