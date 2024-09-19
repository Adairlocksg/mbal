import { GalleryViewProps } from "@/types/Gallery";
import { Card, CardContent } from "./ui/card";

const GalleryList = ({ images }: GalleryViewProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((src, index) => (
        <Card key={index} className="border-2 border-border">
          <CardContent className="flex aspect-[9/16] items-center justify-center p-2">
            <img
              src={src}
              alt={`Imagem ${index + 1}`}
              className="rounded-lg object-cover w-full h-full"
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GalleryList;
