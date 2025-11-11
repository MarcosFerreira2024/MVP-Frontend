import { toast } from "react-hot-toast";

async function handleRegister(name: string, email: string, password: string) {
  const promise = fetch("http://localhost:3333/authentication/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  })
    .then(async (response) => {
      const json = await response.json();

      if (response.status !== 200) {
        throw new Error(json.message);
      }

      return json;
    })
    .catch((e: unknown) => {
      throw e;
    });

  return toast.promise(promise, {
    loading: "Registrando usuário...",
    success: "Cadastro realizado com sucesso!",
  });
}

export default handleRegister;
