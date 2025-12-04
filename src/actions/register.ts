async function handleRegister(
  name: string,
  email: string,
  password: string
): Promise<any> {
  try {
    const response = await fetch(
      "http://localhost:3333/authentication/signup",
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
  } catch (e: any) {
    throw new Error(e.message || "Erro de rede ou comunicação.");
  }
}

export default handleRegister;
