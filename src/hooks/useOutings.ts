import { useContext } from "react";
import { OutingsContext } from "../context/OutingsContext";

export const useOutings = () => {
  const context = useContext(OutingsContext);
  if (!context) {
    throw new Error("useOutings must be used within an OutingsProvider");
  }
  return context;
};