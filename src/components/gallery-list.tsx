import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Card, CardContent } from "./ui/card";
import { GalleryViewProps } from "@/types/Gallery";
import { PencilIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
const ResponsiveGridLayout = WidthProvider(Responsive);

const GalleryList = ({ images }: GalleryViewProps) => {
  const navigate = useNavigate();
  // Mapeia as imagens para criar uma estrutura necessária para o grid layout
  const items = images.map((image, index) => ({
    i: `img_${index}`, // ID único para cada item
    x: index % 4, // Coluna inicial (modulo de 4 para 4 colunas)
    y: Math.floor(index / 4), // Linha inicial
    w: 1, // Largura do item
    h: 1, // Altura do item
    content: image, // URL da imagem
  }));

  const onDragEnd = async () => {
    console.log("Drag end");
  };

  const handleEditClick = (id: string) => {
    navigate(`/edit-image/${id}`);
  };

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
        onLayoutChange={onDragEnd}
        onDragStart={(_layout, _oldItem, _newItem, _placeHolder, event) => {
          //@ts-ignore
          if (event?.target?.id === "edit-button") {
            //@ts-ignore
            const id = event.target.getAttribute("data-id");

            handleEditClick(id);
            event.stopPropagation();
          }
        }}
      >
        {items.map((item) => (
          <div key={item.i} className="border-2 border-border">
            <Card className="h-full flex flex-col">
              <CardContent className="flex aspect-[9/16] items-center flex-col justify-center h-full p-2">
                <img
                  src={item.content.url}
                  alt={`Imagem ${item.i}`}
                  className="rounded-lg object-cover w-full h-full"
                />
                <div className="flex justify-between w-full z-[9999] items-center p-2">
                  <span className="text-sm">{item.content.caption}</span>
                  <PencilIcon
                    id="edit-button"
                    data-id={item.content.id}
                    className="cursor-pointer h-4 w-4"
                  >
                    Editar
                  </PencilIcon>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default GalleryList;
