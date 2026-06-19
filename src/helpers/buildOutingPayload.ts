import toast from "react-hot-toast";
import { createOuting, type OutingPayload } from "../actions/createOuting";
import { categoryUrlMap } from "./parks";
import type { OutingFormState } from "../hooks/useFormState";

export async function buildAndSubmitOuting(
  state: OutingFormState,
  imageJson: string,
  navigate: (path: string) => void,
  resetForm: () => void
) {
  let parsedImages: { alt: string; url: string }[] = [];
  try {
    parsedImages = JSON.parse(imageJson);
    if (
      !Array.isArray(parsedImages) ||
      parsedImages.some((img) => !img.url || !img.alt)
    ) {
      throw new Error("JSON de imagens inválido.");
    }
  } catch {
    toast.error("Formato do JSON de imagens inválido.");
    return;
  }

  const outingPayload: OutingPayload = {
    title: state.title,
    content: state.description,
    price: parseFloat(state.price),
    slug: state.slug,
    publicAudience: "ALL",
    categoryId: state.category.id,
    location: {
      latitude: parseFloat(state.latitude),
      longitude: parseFloat(state.longitude),
      cityId: state.city.id,
    },
    photos: parsedImages,
    openHours: [],
  };

  if (state.category.name === "Trilha") {
    outingPayload.trail = {
      difficulty: state.difficulty,
      duration: Number(state.duration),
      distance: Number(state.distance),
      roundTrip: state.roundTrip,
    };
  } else if (state.category.name === "Parque") {
    outingPayload.park = {
      biodiversity: state.biodiversity,
      maximumCapacity: Number(state.maximumCapacityPark),
    };
  } else if (state.category.name === "Evento") {
    outingPayload.event = {
      maximumCapacity: Number(state.maximumCapacityEvent),
      startDate: new Date(state.startDate).toISOString(),
      endDate: new Date(state.endDate).toISOString(),
    };
  }

  const categoryPath = categoryUrlMap[state.category.name];
  if (!categoryPath) {
    throw new Error("Categoria inválida para criação de passeio.");
  }
  await createOuting(outingPayload, categoryPath);
  toast.success("Passeio criado com sucesso!");
  resetForm();
  navigate(`/outing/${categoryPath}`);
}
