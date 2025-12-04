import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = hash.replace("#", "");

    let tries = 0;
    const interval = setInterval(() => {
      const el = document.getElementById(id);

      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        clearInterval(interval);
      }

      if (tries++ > 20) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [hash]);

  return null;
}
