import Cookies from "js-cookie";

interface UpdateRatingPayload {
  rating: number;
  content?: string;
}

export async function updateRating(ratingId: string, payload: UpdateRatingPayload): Promise<{ status: string; data: unknown; message: string }> {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Você precisa estar logado para editar avaliações.");
  }

  try {
    const response = await fetch(`http://localhost:3333/rating/${ratingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Erro ao atualizar avaliação.");
    }

    return data;
  } catch (e: any) {
    console.error("Erro na atualização da avaliação:", e);
    throw new Error(e.message || "Falha na comunicação com o servidor ao atualizar avaliação.");
  }
}
