import { GalleryViewProps } from "@/types/Gallery";
import {  CardContent } from "./ui/card";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";

const ItemType = "IMAGE"; // Definindo o tipo de item para o drag-and-drop

interface DraggableImageProps {
  src: string;
  index: number;
  moveImage: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableImage = ({ src, index, moveImage }: DraggableImageProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: { index: number }) {
      if (!ref.current || item.index === index) return;
      moveImage(item.index, index);
      item.index = index; // Atualiza o índice de item após a troca
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`border-2 border-border ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <CardContent className="flex aspect-[9/16] items-center justify-center p-2">
        <img
          src={src}
          alt={`Imagem ${index + 1}`}
          className="rounded-lg object-cover w-full h-full"
        />
      </CardContent>
    </div>
  );
};

const GalleryList = ({ images, moveImage }: GalleryViewProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((src, index) => (
        <DraggableImage
          key={index}
          src={src}
          index={index}
          moveImage={moveImage}
        />
      ))}
    </div>
  );
};

export default GalleryList;
