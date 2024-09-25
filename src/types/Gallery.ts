import { Image } from "./Image";

export type GalleryViewProps = {
  images: Image[];
};

export enum GalleryView {
  Carousel = "carousel",
  List = "list",
}
