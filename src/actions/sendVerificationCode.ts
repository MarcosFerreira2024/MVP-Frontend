import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

async function sendVerificationCode(code: string) {
  const promise = fetch("http://localhost:3333/authentication/verify-code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  })
    .then(async (response) => {
      const json = await response.json();

      if (response.status !== 200) {
        throw new Error(json.message);
      }

      Cookies.set("token", json.data);
      return json;
    })
    .catch((e: unknown) => {
      throw e;
    });

  return toast.promise(promise, {
    loading: "Verificando código...",
    success: "Código verificado com sucesso!",
    error: "Falha ao verificar o código",
  });
}

export default sendVerificationCode;
