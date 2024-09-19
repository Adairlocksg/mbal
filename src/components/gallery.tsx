import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, LayoutList, Grid } from "lucide-react";
import GalleryCarousel from "./gallery-carousell";
import GalleryList from "./gallery-list";
import { GalleryView } from "@/types/Gallery";
import { storage } from "@/firebase";
import {
  ref,
  listAll,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

export default function Gallery() {
  const [view, setView] = useState<GalleryView>(GalleryView.Carousel);
  const [images, setImages] = useState<string[]>([]); // URLs das imagens
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null); // Referência para o input de arquivo

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
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;

    // Chama o handleUpload após a seleção da imagem
    handleUpload(e.target.files[0]);
  };

  const handleUpload = (image: File) => {
    if (!image) return;

    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Erro no upload:", error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setImages((prev) => [...prev, url]); // Adiciona a nova URL à galeria
        setProgress(0); // Reseta o progresso
      }
    );
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Dispara o clique no input escondido
    }
  };

  return (
    <div className="container mx-auto p-4 bg-background min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-primary">
        Galeria de Imagens
      </h1>

      <div className="flex justify-between mb-6">
        {/* Botão para alternar entre carrossel e listagem */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setView(
              view === GalleryView.Carousel
                ? GalleryView.List
                : GalleryView.Carousel
            )
          }
          className="bg-card hover:bg-accent"
        >
          {view === GalleryView.Carousel ? (
            <LayoutList className="h-4 w-4" />
          ) : (
            <Grid className="h-4 w-4" />
          )}
        </Button>

        {/* Botão de upload de imagem, que dispara o input escondido */}
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={triggerFileInput}
        >
          <PlusCircle className="h-4 w-4 mr-2" /> Adicionar Imagem
        </Button>

        {/* Input de arquivo escondido */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange} // A imagem é carregada quando o arquivo é selecionado
          style={{ display: "none" }} // Esconde o input
        />
      </div>

      {/* Mostra o progresso do upload */}
      {progress > 0 && <p>Progresso do upload: {progress}%</p>}

      {/* Exibição da galeria */}
      {view === GalleryView.Carousel ? (
        <GalleryCarousel images={images} />
      ) : (
        <GalleryList images={images} />
      )}
    </div>
  );
}
