import { useContext, useState } from "react";
import { loginSchema } from "../helpers/validationSchemas";
import toast from "react-hot-toast";
import type { InputData } from "../components/auth/InputLabelList";
import CodeContext from "../context/CodeContext";
import handleErrors from "../helpers/handleErrors";
import handleLogin from "../actions/login";

export function useLogin() {
  const [form, setForm] = useState({ email: "", password: "" });

  const { openModal } = useContext(CodeContext);
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (form.email.trim() === "" && form.password.trim() === "") {
        return toast.error("Preencha todos os campos");
      }
      loginSchema.parse(form);

      await handleLogin(form.email, form.password);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes("Verifique")) {
          return openModal();
        }
      }
      handleErrors(error);
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
