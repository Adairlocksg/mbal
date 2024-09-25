import { Image } from "./Image";

export type GalleryViewProps = {
  images: Image[];
};

export type SequenceDict = {
  [key: string]: number;
};

export enum GalleryView {
  Carousel = "carousel",
  List = "list",
}
