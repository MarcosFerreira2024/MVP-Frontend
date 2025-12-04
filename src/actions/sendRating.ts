import Cookies from "js-cookie";

interface SendRatingPayload {
  outingId: string;
  rating: number;
  content?: string; // comment is optional
}

export async function sendRating(payload: SendRatingPayload): Promise<any> {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Você precisa estar logado para avaliar.");
  }

  try {
    const response = await fetch("http://localhost:3333/rating", {
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

    return data; // Return success data if needed
  } catch (e: any) {
    console.error("Erro na criação da avaliação:", e);
    throw new Error(e.message || "Falha na comunicação com o servidor ao avaliar.");
  }
}
