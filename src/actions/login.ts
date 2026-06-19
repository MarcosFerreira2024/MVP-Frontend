import { API_URL } from "../helpers/api";

async function handleLogin(email: string, password: string): Promise<string> {
  const response = await fetch(`${API_URL}/authentication/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const json = await response.json();

  if (response.status !== 200) {
    throw new Error(json.error);
  }

  if (!json.data || !json.data.token) {
    throw new Error("Token não encontrado na resposta");
  }

  return json.data.token;
}

export default handleLogin;
