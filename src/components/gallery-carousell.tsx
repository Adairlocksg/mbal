import { GalleryViewProps } from "@/types/Gallery";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const GalleryCarousel = ({ images }: GalleryViewProps) => {
  return (
    <Carousel className="w-full max-w-6xl mx-auto">
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="border-2 border-border">
                <CardContent className="flex aspect-[9/16] items-center justify-center p-2">
                  <img
                    src={src}
                    alt={`Imagem ${index + 1}`}
                    className="rounded-lg object-cover w-full h-full"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default GalleryCarousel;
