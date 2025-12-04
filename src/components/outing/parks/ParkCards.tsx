import { useState } from "react";
import MobileCarousel from "../../MobileCarousel";
import { useUser } from "../../../context/UserContext";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";

const parkData = [
  {
    src: "/tres_picos.webp",
    to: "/outing/parque-estadual-dos-tres-picos",
    name: "Parque Estadual dos Três Picos",
  },
  {
    src: "/parque_nacional.jpg",
    to: "/outing/parque-nacional-serra-dos-orgaos",
    name: "Parque Nacional Serra dos Órgãos",
  },
  {
    src: "/parque_montanhas.jpg",
    to: "/outing/parque-montanhas-teresopolis",
    name: "Parque Natural Municipal Montanhas de Teresópolis",
  },
];

const positions = [
  { side: "-left-8", rotation: "-rotate-2", origin: "origin-right" },
  { side: "left-1/3", rotation: "rotate-0", origin: "" },
  { side: "-right-8", rotation: "rotate-2", origin: "origin-left" },
];

export default function ParkCards() {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const { isAdmin } = useUser();

  const handleEditClick = () => {
    toast.success("Edição dos parques habilitada (em breve)!");
  };

  const handleClick = (index: number) => {
    if (activeIndex === index) {
      window.location.href = parkData[index].to;
    } else {
      setActiveIndex(index);
    }
  };

  const mobileImages = parkData.map((item) => item.src);

  return (
    <div className="relative w-full max-w-[1440px] h-[400px] mx-auto ">
      {isAdmin && (
        <div
          className="absolute top-2 right-2 z-40  text-white p-2 rounded-full cursor-pointer hover:text-green-950 transition-colors"
          onClick={handleEditClick}
        >
          <Pencil className="w-5 h-5" />
        </div>
      )}
      <div className="hidden xl:block">
        {parkData.map((park, index) => {
          const { side, rotation, origin } = positions[index];
          const isActive = activeIndex === index;

          const containerClasses = [
            "absolute inset-y-0 w-1/3 cursor-pointer transition-all duration-500 ease-out",
            side,
            rotation,
            origin,
            isActive ? "z-30 scale-105" : "z-10 scale-95 hover:scale-[1.03]",
          ].join(" ");

          const imageClasses = [
            "w-full h-full object-cover rounded-xl transition-all duration-500 ease-out",
            isActive
              ? "grayscale-0 shadow-2xl"
              : "grayscale opacity-80 hover:opacity-100 hover:grayscale-0",
          ].join(" ");

          return (
            <div
              key={index}
              className={containerClasses}
              onClick={() => handleClick(index)}
            >
              <img src={park.src} alt={park.name} className={imageClasses} />

              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white rounded-b-xl opacity-90">
                <p className="text-lg font-bold truncate">{park.name}</p>
                {isActive && (
                  <p className="text-sm">Clique para ver detalhes</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="xl:hidden w-full max-h-fit h-full">
        <MobileCarousel images={mobileImages} />
      </div>
    </div>
  );
}
