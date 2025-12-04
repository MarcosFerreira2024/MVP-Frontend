import { toast } from "react-hot-toast";

async function handleLogin(email: string, password: string): Promise<string> {
  const promise = fetch("http://localhost:3333/authentication/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then(async (response) => {
      const json = await response.json();

      if (response.status !== 200) {
        throw new Error(json.error);
      }

      if (!json.data || !json.data.token) {
        throw new Error("Token não encontrado na resposta");
      }

      return json.data.token;
    })
    .catch((e: unknown) => {
      throw e;
    });

  return toast.promise(promise, {
    loading: "Fazendo login...",
    success: "Login realizado com sucesso!",
  });
}

export default handleLogin;
