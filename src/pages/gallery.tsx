import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import GalleryList from "../components/gallery-list";
import { storage } from "@/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";

export default function Gallery() {
  const [images, setImages] = useState<string[]>([]); // URLs das imagens

  // Carrega as imagens do Firebase
  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = ref(storage, "images/");
      const result = await listAll(imagesRef);
      const urls = await Promise.all(
        result.items.map((itemRef) => getDownloadURL(itemRef))
      );
      setImages(urls);
    };

    fetchImages();
  }, []);

  // Manipulação do upload de arquivo

  return (
    <div className="container mx-auto p-4 bg-background min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-primary">
        Nosso álbum ❤
      </h1>

      <div className="flex justify-between mb-6">
        <Link
          to="/add-image"
          className="bg-primary hover:bg-primary/90 text-primary-foreground flex justify-center items-center px-3 py-2 rounded-sm"
        >
          <PlusCircle className="h-4 w-4 mr-2" /> Adicionar Imagem
        </Link>
      </div>
      <GalleryList images={images} />
    </div>
  );
}
