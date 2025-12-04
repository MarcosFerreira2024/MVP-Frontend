import { useCallback, useEffect, useState } from "react";

function useGalery() {
  const [isDragging, setIsDragging] = useState(false);
  const [isCarouselOpen, setIsCarouselOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const handleCarouselOpen = () => {
    setIsCarouselOpen(true);
  };

  const handleBackdropClick = () => {
    if (!isDragging) {
      handleClose();
    }
  };

  const handleF = (e: KeyboardEvent) => {
    if (e.key === "f" && !isCarouselOpen && !selectedImage) {
      setIsCarouselOpen(true);
    }
  };

  const handleClose = () => {
    setIsCarouselOpen(false);
    setSelectedImage(undefined);
  };

  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") handleClose();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
    window.addEventListener("keydown", handleF);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      window.removeEventListener("keydown", handleF);
    };
  });

  const closeFullScreenImage = useCallback(() => {
    setSelectedImage(undefined);
  }, [setSelectedImage]);

  return {
    handleBackdropClick,
    handleCarouselOpen,
    isCarouselOpen,
    closeFullScreenImage,
    isDragging,
    setIsDragging,
    handleClose,
    selectedImage,
    setSelectedImage,
  };
}

export default useGalery;
