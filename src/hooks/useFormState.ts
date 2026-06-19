import { useState, useCallback } from "react";
import { categories, cities } from "../helpers/parks";

export type DataItem = { id: number; name: string };
export type SetStringDispatch = React.Dispatch<React.SetStateAction<string>>;
export type SetDataItemDispatch = React.Dispatch<React.SetStateAction<DataItem>>;
export type SetNumberDispatch = React.Dispatch<React.SetStateAction<number | string>>;

export interface OutingFormState {
  city: DataItem;
  category: DataItem;
  description: string;
  title: string;
  price: string;
  slug: string;
  latitude: string;
  longitude: string;
  maximumCapacityEvent: string;
  startDate: string;
  endDate: string;
  difficulty: string;
  duration: number | string;
  distance: number | string;
  roundTrip: boolean;
  biodiversity: string;
  maximumCapacityPark: string;
  imageJson: string;
}

export const minStep = 1;
export const maxStep = 3;

export function useFormState() {
  const [city, setCity] = useState<DataItem>(cities[0]);
  const [category, setCategory] = useState<DataItem>(categories[0]);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [slug, setSlug] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [maximumCapacityEvent, setMaximumCapacityEvent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [duration, setDuration] = useState<number | string>("");
  const [distance, setDistance] = useState<number | string>("");
  const [roundTrip, setRoundTrip] = useState(true);
  const [biodiversity, setBiodiversity] = useState("");
  const [maximumCapacityPark, setMaximumCapacityPark] = useState("");
  const [imageJson, setImageJson] = useState("");

  const formState: OutingFormState = {
    city,
    category,
    description,
    title,
    price,
    slug,
    latitude,
    longitude,
    maximumCapacityEvent,
    startDate,
    endDate,
    difficulty,
    duration,
    distance,
    roundTrip,
    biodiversity,
    maximumCapacityPark,
    imageJson,
  };

  const setters = {
    setCity,
    setCategory,
    setDescription,
    setTitle,
    setPrice,
    setSlug,
    setLatitude,
    setLongitude,
    setMaximumCapacityEvent,
    setStartDate,
    setEndDate,
    setDifficulty,
    setDuration,
    setDistance,
    setRoundTrip,
    setBiodiversity,
    setMaximumCapacityPark,
    setImageJson,
  };

  const resetForm = useCallback(() => {
    setCity(cities[0]);
    setCategory(categories[0]);
    setDescription("");
    setTitle("");
    setPrice("");
    setSlug("");
    setLatitude("");
    setLongitude("");
    setMaximumCapacityEvent("");
    setStartDate("");
    setEndDate("");
    setDifficulty("EASY");
    setDuration("");
    setDistance("");
    setRoundTrip(true);
    setBiodiversity("");
    setMaximumCapacityPark("");
    setImageJson("");
  }, []);

  return { formState, setters, resetForm };
}
