import Cookies from "js-cookie";
import { API_URL } from "../helpers/api";

export async function deleteRating(
  outingId: string,
  ratingId: string,
): Promise<any> {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Você precisa estar logado para apagar avaliações.");
  }

  try {
    const response = await fetch(`${API_URL}/rating/${ratingId}/${outingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      return { message: "Avaliação apagada com sucesso!" };
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || data.error || "Erro ao apagar avaliação.",
      );
    }

    return data;
  } catch (error: unknown) {
    console.error("Erro ao apagar avaliação:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Falha na comunicação com o servidor ao apagar avaliação.",
    );
  }
}
