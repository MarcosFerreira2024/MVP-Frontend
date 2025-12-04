import Cookies from "js-cookie";

export async function sendVerificationCode(email: string, code: string): Promise<any> {
  const token = Cookies.get("token"); 

  if (!token) {
    console.warn("No authentication token found for code verification.");
  }

  try {
    const response = await fetch("http://localhost:3333/authentication/verify-code", {
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
  } catch (e: any) {
    throw new Error(e.message || "Erro de rede ou comunicação para verificação de código.");
  }
}