"use client";

import type React from "react";
import MobileCarousel from "../MobileCarousel";
import Button from "../Button";
import { useUser } from "../../context/UserContext";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";

export type OutingCardProps = {
  rating: string;
  ratingCount: number;
  title: string;
  description: string;
  price: string;
  to: string;
  images: string[];
  style?: React.CSSProperties;
};

const mocks = {
  rating: "0,0",
  ratingCount: 0,
  title: "Festival das Lanternas de Lúmina",
  description: `Um espetáculo noturno de luzes e música ao ar livre,
       onde os participantes podem soltar lanternas iluminadas no lago central do parque, 
      acompanhar apresentações de artistas locais e curtir food trucks com comidas típicas.`,
  price: "0,0",
  redirectTo: "/outing/1",
  images: ["/festival-lanternas.jpg"],
  style: {},
};

export function OutingCard({
  rating = mocks.rating,
  ratingCount = mocks.ratingCount,
  title = mocks.title,
  description = mocks.description,
  price = mocks.price,
  to = mocks.redirectTo,
  images = mocks.images,
  style = {},
}: OutingCardProps) {
  const { isAdmin } = useUser();
  const isFree = parseInt(price) == 0.0;

  const handleEditClick = () => {
    toast.success("Edição habilitada (funcionalidade em breve)!");
  };

  return (
    <article
      style={style}
      className="relative flex flex-1 flex-col font-segoe font-semibold  max-h-fit rounded-xl border border-gray-50 shadow-lg overflow-hidden bg-gray-50 h-full"
    >
      {isAdmin && (
        <div
          className="absolute top-2 right-2 z-10 bg-green-950 text-white p-2 rounded-full cursor-pointer hover:text-green-950 transition-colors"
          onClick={handleEditClick}
        >
          <Pencil className="w-4 h-4" />
        </div>
      )}
      <div className="relative w-full h-[200px] overflow-hidden bg-green-900">
        <MobileCarousel images={images} />
      </div>

      <div className="w-full bg-gray-50 flex-1 flex flex-col gap-3 p-3">
        <div className="flex justify-between items-start relative">
          <div className="flex flex-col grow">
            <h1 className="md:w-[220px] text-green-900 text-xl h-[56px] line-clamp-2">
              {title}
            </h1>
            <p className="text-sm  text-gray-500 h-[80px] line-clamp-4 ">
              {description}
            </p>
          </div>
          <div className="flex absolute right-0 top-0 gap-2 items-center">
            <img src="/star.svg" />
            <p className="text-green-900 text-sm">
              {rating} ({ratingCount})
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-auto">
          <div className="flex gap-2 items-center">
            <img src="/user.svg" />
            <p className="text-green-900">{isFree ? "Gratuito" : `${price}`}</p>
          </div>
          <Button
            icon={"/arrow-up-right-green.svg"}
            onClick={() => (window.location.href = to)}
            size="sm"
          >
            Saiba Mais
          </Button>
        </div>
      </div>
    </article>
  );
}
