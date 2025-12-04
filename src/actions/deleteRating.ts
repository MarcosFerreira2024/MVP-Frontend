import Cookies from "js-cookie";

export async function deleteRating(outingId: string, ratingId: string): Promise<any> {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Você precisa estar logado para apagar avaliações.");
  }

  try {
    const response = await fetch(`http://localhost:3333/rating`, { // Endpoint without ratingId in path
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ outingId, ratingId }), // Send in body
    });

    // Check if the response indicates success but might not have a JSON body (e.g., 204 No Content)
    if (response.status === 204) {
      return { message: "Avaliação apagada com sucesso!" }; // Custom success message
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Erro ao apagar avaliação.");
    }

    return data;
  } catch (e: any) {
    console.error("Erro ao apagar avaliação:", e);
    throw new Error(e.message || "Falha na comunicação com o servidor ao apagar avaliação.");
  }
}
