import { useState, useEffect, useRef } from "react";

function preloadImages(urls: string[]): Promise<void> {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = url;
        }),
    ),
  ).then(() => undefined);
}

export function useImagePreloader(urls: string[]) {
  const [imagesReady, setImagesReady] = useState(false);
  const prevIdRef = useRef<string | null>(null);

  const key = urls.join(",");

  useEffect(() => {
    if (!urls.length || key === prevIdRef.current) return;
    prevIdRef.current = key;
    setImagesReady(false);
    preloadImages(urls).then(() => setImagesReady(true));
  }, [key, urls.length]);

  return imagesReady;
}
