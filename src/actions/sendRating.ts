import Cookies from "js-cookie";
import { API_URL } from "../helpers/api";

interface SendRatingPayload {
  outingId: string;
  rating: number;
  content?: string;
}

export async function sendRating(payload: SendRatingPayload): Promise<any> {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Você precisa estar logado para avaliar.");
  }

  try {
    const response = await fetch(`${API_URL}/rating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Erro ao enviar avaliação.");
    }

    return data;
  } catch (error: unknown) {
    console.error("Erro na criação da avaliação:", error);
    throw new Error(error instanceof Error ? error.message : "Falha na comunicação com o servidor ao avaliar.");
  }
}
