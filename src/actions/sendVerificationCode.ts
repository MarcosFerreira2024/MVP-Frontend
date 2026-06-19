import Cookies from "js-cookie";
import { API_URL } from "../helpers/api";

export async function sendVerificationCode(email: string, code: string): Promise<any> {
  const token = Cookies.get("token"); 

  if (!token) {
    console.warn("No authentication token found for code verification.");
  }

  try {
    const response = await fetch(`${API_URL}/authentication/verify-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ email, code }),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message || json.error || "Falha na verificação do código.");
    }

    return json; 
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : "Erro de rede ou comunicação para verificação de código.");
  }
}