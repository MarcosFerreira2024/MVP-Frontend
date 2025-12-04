import { motion } from "framer-motion";
import useTrailCard from "../../hooks/useTrailCard";
import { useUser } from "../../context/UserContext";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";

type TrailImageProps = {
  side: "left" | "right";
  image: string;
};

function TrailImage({ image, side }: TrailImageProps) {
  const { boltPosition, origin, rotationValue } = useTrailCard(side);

  const { isAdmin } = useUser();

  const handleEditClick = () => {
    toast.success("Edição habilitada (funcionalidade em breve)!");
    // In the future, this could open a modal e.g., openEditModal(trailId);z
  };

  return (
    <div className="relative z-50 h-[500px] w-[500px] ">
      <img
        src="parafuso.png"
        className="absolute top-2 z-20"
        style={boltPosition}
      />

      {isAdmin && (
        <div
          className={`absolute ${
            side === "left" ? "left-0" : "right-0"
          } top-0 z-10 bg-gray-50 text-green-950 p-2 rounded-full cursor-pointer hover:bg-gray-300 transition-colors`}
          onClick={handleEditClick}
        >
          <Pencil className="w-5 h-5" />
        </div>
      )}

      <motion.div
        initial={{ rotate: rotationValue }}
        style={{ transformOrigin: origin }}
        className="rounded-lg w-full h-full main-shadow  bg-green-900"
      >
        <div className="p-4 w-full h-full ">
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
        </div>
      </motion.div>
    </div>
  );
}

export default TrailImage;
