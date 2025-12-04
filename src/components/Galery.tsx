import type React from "react";
import { FullScreenImage } from "./FullScreenImage";
import { FullGaleryImages } from "./FullGaleryImages";
import VisibleGaleryImages from "./VisibleGaleryImages";
import useGalery from "../hooks/useGalery";

type GaleryProps = {
  images: string[];
};

export function Galery({ images }: GaleryProps) {
  const {
    handleBackdropClick,
    handleClose,
    handleCarouselOpen,
    isCarouselOpen,
    setIsDragging,
    selectedImage,
    setSelectedImage,
  } = useGalery();

  const visibleImages = Array.from(images).splice(0, 7);

  return (
    <>
      <VisibleGaleryImages
        handleCarouselOpen={handleCarouselOpen}
        setSelectedImage={setSelectedImage}
        visibleImages={visibleImages}
      />
      <FullScreenImage close={handleClose} image={selectedImage} />
      <FullGaleryImages
        images={images}
        close={handleClose}
        handleBackdropClick={handleBackdropClick}
        isOpen={isCarouselOpen}
        onDragStateChange={setIsDragging}
      />
    </>
  );
}
