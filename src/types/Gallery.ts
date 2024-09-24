export type GalleryViewProps = {
  images: string[];
  moveImage: (dragIndex: number, hoverIndex: number) => void;
};

export enum GalleryView {
  Carousel = "carousel",
  List = "list",
}
