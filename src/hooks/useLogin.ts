import { useContext, useState } from "react";
import { loginSchema } from "../helpers/validationSchemas";
import toast from "react-hot-toast";
import type { InputData } from "../components/auth/InputLabelList";
import CodeContext from "../context/CodeContext";
import handleErrors from "../helpers/handleErrors";
import handleLogin from "../actions/login";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export function useLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useUser();
  const navigate = useNavigate();

  const { openModal } = useContext(CodeContext);
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (form.email.trim() === "" && form.password.trim() === "") {
        return toast.error("Preencha todos os campos");
      }
      loginSchema.parse(form); // Validate form data with Zod

      // Use toast.promise to wrap the asynchronous login process
      const token = await toast.promise(
        handleLogin(form.email, form.password),
        {
          loading: "Fazendo login...",
          success: "Login realizado com sucesso!",
          error: (err: any) => {
            const errorMessage = handleErrors(err); // Get the error message string

            if (errorMessage.includes("Usuário nao verificado")) {
              openModal(form.email); // Pass the email to openModal
              return "Verifique seu email para concluir o login."; // Custom message for this scenario
            }
            return errorMessage; // For other errors, return the message to toast
          },
        }
      );

      // If handleLogin resolves (success), then call useUser's login function
      await login(token);
      navigate("/");
    } catch (error: unknown) {
      // This catch block handles Zod errors from loginSchema.parse(form)
      // or any unhandled rejections from toast.promise itself if its error callback throws
      toast.error(handleErrors(error));
    } finally {
      setLoading(false);
    }
  };

  const data: InputData[] = [
    {
      id: "email",
      name: "email",
      label: "Email",
      value: form.email,
      placeholder: "Digite seu Email",

      onChange,
      type: "email",
    },
    {
      id: "password",
      name: "password",
      label: "Senha",
      value: form.password,
      placeholder: "Digite sua Senha",

      type: "password",
      onChange,
    },
  ];

  return { data, onSubmit, loading };
}
