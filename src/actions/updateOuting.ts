import Cookies from "js-cookie";
import { API_URL } from "../helpers/api";

export type UpdateOutingPayload = {
  title?: string;
  content?: string;
  price?: number;
  slug?: string;
  publicAudience?: string;
  categoryId?: number;
  location?: {
    latitude: number;
    longitude: number;
    cityId: number;
  };
  photos?: { alt: string; url: string }[];
  openHours?: { dayOfWeek: number; openTime: string; closeTime: string }[];
  trail?: {
    difficulty: string;
    duration: number;
    distance: number;
    roundTrip: boolean;
  };
  park?: {
    biodiversity: string;
    maximumCapacity: number;
  };
  event?: {
    maximumCapacity: number;
    startDate: string;
    endDate: string;
  };
};

export async function updateOuting(id: string, payload: UpdateOutingPayload): Promise<Record<string, unknown>> {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Usuário não autenticado. Faça login para editar passeios.");
  }

  try {
    const response = await fetch(`${API_URL}/outing/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || data.error || "Erro desconhecido ao editar passeio.";
      throw new Error(errorMessage);
    }

    return data;
  } catch (error: unknown) {
    console.error("Erro na edição do passeio:", error);
    throw new Error(error instanceof Error ? error.message : "Falha na comunicação com o servidor.");
  }
}
