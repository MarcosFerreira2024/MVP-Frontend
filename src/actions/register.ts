import { API_URL } from "../helpers/api";

async function handleRegister(
  name: string,
  email: string,
  password: string
): Promise<any> {
  try {
    const response = await fetch(
      `${API_URL}/authentication/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message || json.error || "Falha no cadastro.");
    }

    return json;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : "Erro de rede ou comunicação.");
  }
}

export default handleRegister;
