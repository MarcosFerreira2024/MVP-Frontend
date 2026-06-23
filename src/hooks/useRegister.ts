import { useState, type ChangeEvent, type FormEvent } from "react";
import { registerSchema } from "../helpers/validationSchemas";
import toast from "react-hot-toast";
import type { InputData } from "../components/auth/InputLabelList";
import handleRegister from "../actions/register";
import handleErrors from "../helpers/handleErrors";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (
        form.email.trim() === "" &&
        form.password.trim() === "" &&
        form.password === "" &&
        form.confirmPassword === ""
      ) {
        return toast.error("Preencha todos os campos");
      }
      registerSchema.parse(form);
      await toast.promise(
        handleRegister(form.name, form.email, form.password),
        {
          loading: "Registrando usuário...",
          success: "Usuário registrado com sucesso! Faça login novamente",
          error: (err) => handleErrors(err),
        },
      );
      navigate("/login");
    } catch (error) {
      toast.error(handleErrors(error));
    } finally {
      setLoading(false);
    }
  };

  const data: InputData[] = [
    {
      id: "name",
      name: "name",
      label: "Nome",
      value: form.name,
      placeholder: "Digite seu nome",
      type: "text",
      onChange,
    },
    {
      id: "email",
      name: "email",
      label: "Email",
      value: form.email,
      placeholder: "Digite seu Email",

      type: "email",

      onChange,
    },
    {
      id: "password",
      name: "password",
      label: "Senha",
      placeholder: "Digite sua Senha",

      value: form.password,
      type: "password",

      onChange,
    },
    {
      id: "confirmPassword",
      name: "confirmPassword",
      label: "Confirmar Senha",
      placeholder: "Confirme sua Senha",

      value: form.confirmPassword,
      type: "password",

      onChange,
    },
  ];

  return { data, onSubmit, loading };
}
