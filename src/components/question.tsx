import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

const Question = () => {
  const [answer, setAnswer] = useState("");

  const handleAnswer = () => {
    if (answer === "22") {
      toast("Acertou hehe, te amo minha linda!❤", {
        style: {
          backgroundColor: "#FDB0C0",
          color: "#640615",
          borderColor: "#640615",
        },
      });
    } else {
      toast.error("Resposta incorreta!");
    }
  };

  return (
    <div className="flex">
      <Input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Insira sua resposta"
        type="number"
      />
      <Button className="ml-2" onClick={handleAnswer}>
        Responder
      </Button>
    </div>
  );
};

export default Question;
