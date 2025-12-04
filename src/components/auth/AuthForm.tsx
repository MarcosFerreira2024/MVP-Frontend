import InputLabelList, { type InputData } from "./InputLabelList";
import Button from "../Button";
import { Link } from "react-router-dom";

type AuthType = "login" | "register";

type AuthFormProps = {
  data: InputData[];
  type: AuthType;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
};

const authConfig: Record<
  AuthType,
  {
    title: string;
    button: string;
    question: string;
    linkText: string;
    linkTo: string;
  }
> = {
  login: {
    title: "Login",
    button: "Entrar",
    question: "Não possui uma conta?",
    linkText: "Registre-se",
    linkTo: "/register",
  },
  register: {
    title: "Registre-se",
    button: "Registrar",
    question: "Já possui uma conta?",
    linkText: "Logar",
    linkTo: "/login",
  },
};

function AuthForm({ data, type, onSubmit, isLoading }: AuthFormProps) {
  const config = authConfig[type];

  return (
    <form
      autoComplete="off"
      onSubmit={onSubmit}
      className="w-full flex flex-col gap-5"
    >
      <h2 className="font-segoe text-4xl text-gray-50 text-center">
        {config.title}
      </h2>

      <InputLabelList data={data} />

      <Button disabled={isLoading} type="submit">
        {config.button}
      </Button>

      <div className="flex self-end">
        <p className="text-gray-300 text-right font-semibold font-segoe text-sm">
          {config.question}
          <br />
          <Link to={config.linkTo} className="border-b border-gray-300">
            {config.linkText}
          </Link>
        </p>
      </div>
    </form>
  );
}

export default AuthForm;
