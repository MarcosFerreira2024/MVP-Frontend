import Cookies from "js-cookie";

export async function deleteOuting(id: string): Promise<Record<string, unknown>> {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Usuário não autenticado. Faça login para excluir passeios.");
  }

  try {
    const response = await fetch(`http://localhost:3333/outing/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      return { message: "Passeio excluído com sucesso!" };
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Erro ao excluir passeio.");
    }

    return data;
  } catch (e: unknown) {
    console.error("Erro ao excluir passeio:", e);
    throw new Error(e instanceof Error ? e.message : "Falha na comunicação com o servidor ao excluir passeio.");
  }
}
