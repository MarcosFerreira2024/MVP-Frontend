import Cookies from "js-cookie";

export interface OutingPayload {
  title: string;
  content: string;
  price: number;
  slug: string;
  publicAudience: string;
  categoryId: number; // UUID for category
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
    startDate: string; // ISO string
    endDate: string; // ISO string
  };
}

export async function createOuting(payload: OutingPayload, categoryPath: string): Promise<any> {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Usuário não autenticado. Faça login para criar passeios.");
  }

  try {
    const response = await fetch(`http://localhost:3333/outing/${categoryPath}`, {
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
  } catch (error: any) {
    console.error("Erro na criação do passeio:", error);
    throw new Error(error.message || "Falha na comunicação com o servidor.");
  }
}
