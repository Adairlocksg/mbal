import { Responsive, WidthProvider } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Card, CardContent } from "./ui/card";
import { GalleryViewProps } from "@/types/Gallery";

const ResponsiveGridLayout = WidthProvider(Responsive);

const GalleryList = ({ images }: GalleryViewProps) => {
  // Mapeia as imagens para criar uma estrutura necessária para o grid layout
  const items = images.map((image, index) => ({
    i: `img_${index}`, // ID único para cada item
    x: index % 4, // Coluna inicial (modulo de 4 para 4 colunas)
    y: Math.floor(index / 4), // Linha inicial
    w: 1, // Largura do item
    h: 1, // Altura do item
    content: image, // URL da imagem
  }));

  return (
    <div className="grid-layout-container">
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: items, md: items, sm: items, xs: items }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 4, md: 3, sm: 2, xs: 1 }}
        rowHeight={600}
        isDraggable={true}
        isResizable={false}
        onLayoutChange={(layout) => {
          console.log('Layout changed:', layout);
        }}
      >
        {items.map((item) => (
          <div key={item.i} className="border-2 border-border">
            <Card className="h-full">
              <CardContent className="flex aspect-[9/16] items-center justify-center h-full p-2">
                <img
                  src={item.content}
                  alt={`Imagem ${item.i}`}
                  className="rounded-lg object-cover w-full h-full"
                />
              </CardContent>
            </Card>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default GalleryList;
