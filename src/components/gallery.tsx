"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PlusCircle, LayoutList, Grid } from "lucide-react";

const images = [
  "/placeholder.svg?height=300&width=300",
  "/placeholder.svg?height=300&width=300",
  "/placeholder.svg?height=300&width=300",
  "/placeholder.svg?height=300&width=300",
  "/placeholder.svg?height=300&width=300",
  "/placeholder.svg?height=300&width=300",
];

export default function Gallery() {
  const [view, setView] = useState<"carousel" | "list">("carousel");

  return (
    <div className="container mx-auto p-4 bg-background min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-primary">
        Galeria de Imagens
      </h1>
      <div className="flex justify-between mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setView(view === "carousel" ? "list" : "carousel")}
          className="bg-card hover:bg-accent"
        >
          {view === "carousel" ? (
            <LayoutList className="h-4 w-4" />
          ) : (
            <Grid className="h-4 w-4" />
          )}
        </Button>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <PlusCircle className="h-4 w-4 mr-2" /> Adicionar Imagem
        </Button>
      </div>
      {view === "carousel" ? (
        <Carousel className="w-full max-w-xl mx-auto">
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="border-2 border-border">
                    <CardContent className="flex aspect-square items-center justify-center p-2">
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((src, index) => (
            <Card key={index} className="border-2 border-border">
              <CardContent className="flex aspect-square items-center justify-center p-2">
                <img
                  src={src}
                  alt={`Imagem ${index + 1}`}
                  className="rounded-lg object-cover w-full h-full"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
