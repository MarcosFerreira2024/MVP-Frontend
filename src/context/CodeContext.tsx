import { createContext, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { sendVerificationCode } from "../actions/sendVerificationCode";
import handleErrors from "../helpers/handleErrors";

type ContextProviderProps = {
  children: React.ReactNode;
};

type ContextType = {
  openModal: (email: string) => void;
  closeModal: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isVisible: boolean;
  isLoading: boolean;
  codeValue: string;
  emailValue: string;
};

const CodeContext = createContext({} as ContextType);
export default CodeContext;

export const CodeContextProvider = ({ children }: ContextProviderProps) => {
  const [code, setCode] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setVisibility] = useState<boolean>(false);

  const closeModal = useCallback(() => {
    setVisibility(false);
    setCode("");
    setEmail("");
  }, []);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  }, []);

  const openModal = useCallback((userEmail: string) => {
    setEmail(userEmail);
    setVisibility(true);
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      if (!code || !email) {
        toast.error("Preencha todos os campos.");
        setIsLoading(false);
        return;
      }

      try {
        await toast.promise(sendVerificationCode(email, code), {
          loading: "Verificando código...",
          success: "Código verificado com sucesso! Faça login novamente.",
          error: (err) => handleErrors(err),
        });
        closeModal();
      } catch (error) {
        return;
      } finally {
        setIsLoading(false);
      }
    },
    [code, email, closeModal]
  );

  return (
    <CodeContext.Provider
      value={{
        closeModal,
        onChange,
        onSubmit,
        openModal,
        isVisible,
        isLoading,
        codeValue: code,
        emailValue: email,
      }}
    >
      {children}
    </CodeContext.Provider>
  );
};
