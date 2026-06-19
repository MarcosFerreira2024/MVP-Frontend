import Cookies from "js-cookie";
import { API_URL } from "../helpers/api";

export interface OutingPayload {
  title: string;
  content: string;
  price: number;
  slug: string;
  publicAudience: string;
  categoryId: number;
  location: {
    latitude: number;
    longitude: number;
    cityId: number;
  };
  photos: { alt: string; url: string }[];
  openHours: { dayOfWeek: number; openTime: string; closeTime: string }[];
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
}

export async function createOuting(payload: OutingPayload, categoryPath: string): Promise<any> {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Usuário não autenticado. Faça login para criar passeios.");
  }

  try {
    const response = await fetch(`${API_URL}/outing/${categoryPath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || "Erro desconhecido ao criar passeio.";
      throw new Error(errorMessage);
    }

    return data;
  } catch (error: unknown) {
    console.error("Erro na criação do passeio:", error);
    throw new Error(error instanceof Error ? error.message : "Falha na comunicação com o servidor.");
  }
}
