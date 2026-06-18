import { motion } from "framer-motion";
import useTrailCard from "../../hooks/useTrailCard";
import { useUser } from "../../context/UserContext";
import toast from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";

type TrailImageProps = {
  id: string;
  side: "left" | "right";
  image: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

function TrailImage({ id, image, side, onEdit, onDelete }: TrailImageProps) {
  const { boltPosition, origin, rotationValue } = useTrailCard(side);
  const isMobile = window.innerWidth < 768;
  const { isAdmin } = useUser();

  const handleEditClick = () => {
    if (onEdit) onEdit(id);
    else toast.success("Edição habilitada (funcionalidade em breve)!");
  };

  const handleDeleteClick = () => {
    if (onDelete) onDelete(id);
    else toast.success("Funcionalidade em breve!");
  };

  const imageContent = (
    <motion.img
      initial={{ filter: "grayscale(1)" }}
      whileInView={{ filter: "grayscale(0)" }}
      exit={{ filter: "grayscale(1)" }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 14,
        mass: 0.6,
      }}
      viewport={{ once: false, amount: 0.8 }}
      src={image}
      className="object-cover w-full rounded-lg border-green-950 border h-full"
    />
  );

  return (
    <div className="relative z-10 w-full max-w-[500px] md:h-[500px] md:w-[500px] h-[400px]">
      <img
        src="parafuso.png"
        className="absolute top-2 z-20 max-md:hidden"
        style={boltPosition}
      />

      {isAdmin && (
        <div
          className={`absolute ${
            side === "left" ? "left-0" : "right-0"
          } top-0 z-10 flex gap-2`}
        >
          <div
            className="bg-gray-50 text-green-950 p-2 rounded-full cursor-pointer hover:bg-gray-300 transition-colors"
            onClick={handleEditClick}
          >
            <Pencil className="w-5 h-5" />
          </div>
          <div
            className="bg-red-700 text-white p-2 rounded-full cursor-pointer hover:bg-red-600 transition-colors"
            onClick={handleDeleteClick}
          >
            <Trash2 className="w-5 h-5" />
          </div>
        </div>
      )}

      {isMobile ? (
        <div className="rounded-lg w-full h-full bg-green-900">
          <div className="p-1 w-full h-full">{imageContent}</div>
        </div>
      ) : (
        <motion.div
          initial={{ rotate: rotationValue }}
          style={{ transformOrigin: origin }}
          className="rounded-lg w-full h-full main-shadow bg-green-900"
        >
          <div className="p-4 w-full h-full">{imageContent}</div>
        </motion.div>
      )}
    </div>
  );
}

export default TrailImage;
