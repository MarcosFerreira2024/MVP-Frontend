import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

async function handleLogin(email: string, password: string) {
  const promise = fetch("http://localhost:3333/authentication/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then(async (response) => {
      const json = await response.json();

      if (response.status !== 200) {
        throw new Error(json.message);
      }

      if (json.data) {
        Cookies.set("token", json.data);
      }

      return json;
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
