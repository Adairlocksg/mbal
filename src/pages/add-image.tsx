import { Button } from "@/components/ui/button";
import { ArrowLeft, ImageUp, PencilIcon, SaveIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { storage } from "@/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom"; // Para navegação
import { Input } from "@/components/ui/input";
import Progress from "@/components/progress";
import LoadingButton from "@/components/ui/base/loading-button";
import { toast } from "sonner";
import axios from "axios";
import { API_BASE_URL } from "@/api/api";
import { useParams } from "react-router-dom";
import { Image } from "@/types/Image";

const AddImage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [caption, setCaption] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getImage = async (id: string) => {
      try {
        const response = await axios.get<Image>(`${API_BASE_URL}/images/${id}`);
        const { url, caption } = response.data;
        setUrl(url);
        setCaption(caption);
      } catch (error) {
        toast.error(`Erro ao buscar imagem: ${error}`);
      }
    };

    if (id) {
      getImage(id);
    }
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;

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
        setUrl(url);
        setProgress(0); // Reseta o progresso
      }
    );
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Dispara o clique no input escondido
    }
  };

  const handleGoBack = () => {
    navigate("/"); // Volta para a tela inicial
  };

  const handleSave = async () => {
    if (id) {
      updateCaption();
    } else {
      addImage();
    }
  };

  const addImage = async () => {
    if (!url) {
      return toast.error("Selecione uma imagem para salvar");
    }

    if (!caption) {
      return toast.error("Adicione uma legenda para salvar");
    }

    setIsSaving(true);

    try {
      await axios.post(`/images`, {
        url,
        caption,
      });
      toast.success("Imagem salva com sucesso!");
      setTimeout(() => {
        handleGoBack();
      }, 200);
    } catch (error) {
      toast.error(`Erro ao salvar imagem: ${error}`);
    } finally {
      setIsSaving(false);
    }
  };

  const updateCaption = async () => {
    if (!caption) {
      toast.error("Adicione uma legenda para salvar");
    }

    setIsSaving(true);

    try {
      await axios.put(`${API_BASE_URL}/images/${id}/caption`, {
        caption,
      });
      toast.success("Legenda atualizada com sucesso!");
      setTimeout(() => {
        handleGoBack();
      }, 200);
    } catch (error) {
      toast.error(`Erro ao atualizar legenda: ${error}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full flex justify-start mb-4">
        <Button
          className="bg-transparent hover:bg-gray-200 text-primary-foreground p-2"
          onClick={handleGoBack}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex justify-center w-full gap-2">
        <Input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Adicione uma legenda"
          className="w-full p-2 border rounded-lg mb-4 flex-1"
        />
        <Button
          disabled={caption.length === 0 || id !== undefined}
          variant="secondary"
          onClick={triggerFileInput}
        >
          <ImageUp className="h-4 w-4 mr-2" /> Selecionar
        </Button>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange} // A imagem é carregada quando o arquivo é selecionado
        style={{ display: "none" }} // Esconde o input
      />
      {progress > 0 && <Progress progress={progress} />}
      {url ? (
        <CardContent className="flex aspect-[9/16] items-center justify-center max-h-[43.75rem] p-2 mb-4">
          <img
            src={url}
            alt={`Imagem ${url}`}
            className="rounded-lg object-cover w-full h-full"
          />
        </CardContent>
      ) : (
        <span className="mb-4">Selecione uma imagem para visualizar</span>
      )}
      {url && (
        <LoadingButton
          loading={isSaving}
          onClick={handleSave}
          icon={
            id ? (
              <PencilIcon className="h-4 w-4 ml-2" />
            ) : (
              <SaveIcon className="h-4 w-4 ml-2" />
            )
          }
          variant="default"
        >
          {id ? "Atualizar legenda" : "Salvar"}
        </LoadingButton>
      )}
    </div>
  );
};

export default AddImage;
