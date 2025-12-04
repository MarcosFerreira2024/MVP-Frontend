import { Star } from "lucide-react";
import { useState } from "react";
import Button from "../Button";
import TextArea from "../TextArea";
import { sendRating } from "../../actions/sendRating";
import handleErrors from "../../helpers/handleErrors";
import toast from "react-hot-toast";

interface RatingFormProps {
  outingId: string;
  title?: string;
  description?: string;
  close: () => void;
  onRatingSuccess?: () => void;
  maxStars?: number;
}

export function RatingForm({
  outingId,
  title = "Avalie esse passeio",
  description = "Deixe seu feedback",
  close,
  onRatingSuccess,
  maxStars = 5,
}: RatingFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  const handleStarHover = (starIndex: number) => {
    setHoverRating(starIndex + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Por favor, selecione uma avaliação de 1 a 5 estrelas.");
      return;
    }

    setIsLoading(true);
    try {
      await toast.promise(sendRating({ outingId, rating, content }), {
        loading: "Enviando avaliação...",
        success: "Avaliação enviada com sucesso!",
        error: (err) => handleErrors(err),
      });
      onRatingSuccess?.();
      close();
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="fixed inset-0 w-screen h-screen z-99999 top-0 left-0  flex items-center justify-center ">
      <div className="bg-gray-50 flex flex-col gap-4 rounded-md main-shadow text-main p-4 w-full max-w-md border border-green-900 relative">
        <Button
          onClick={close}
          className="w-6 h-6 absolute rounded-md   right-2"
          size="icon"
        >
          X
        </Button>
        <div>
          <h2 className="text-2xl  text-main ">{title}</h2>

          <p className="text-gray-400 text-sm ">{description}</p>
        </div>

        <div
          className="flex gap-4 justify-between"
          onMouseLeave={handleMouseLeave}
        >
          {Array.from({ length: maxStars }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleStarClick(index)}
              onMouseEnter={() => handleStarHover(index)}
              className="focus:ring-2 focus:outline-none focus:ring-green-900 w-[36px] h-[36px] flex items-center justify-center rounded-md transition-all  ease-out duration-150"
              aria-label={`Rate ${index + 1} stars`}
            >
              <Star
                size={36}
                fill={index < displayRating ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={2}
                className={`transition-all flex self-center duration-150 ${
                  index < displayRating
                    ? "text-green-900"
                    : "text-gray-400 hover:text-green-900"
                }`}
              />
            </button>
          ))}
        </div>

        <div>
          <TextArea
            to="content"
            text="Seu comentário (opcional)"
            placeholder="Nos conte sua experiência..."
            value={content}
            onChange={(e) => setContent(e.currentTarget.value)}
            rows={3}
          />
        </div>

        <Button
          onClick={handleSubmit}
          variant="contrast"
          disabled={rating === 0 || isLoading}
          className="flex-1"
        >
          {isLoading ? "Enviando..." : "Enviar avaliação"}
        </Button>
      </div>
    </div>
  );
}
