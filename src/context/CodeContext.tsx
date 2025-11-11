import { createContext, useState } from "react";
import toast from "react-hot-toast";
import sendVerificationCode from "../actions/sendVerificationCode";

type ContextProviderProps = {
  children: React.ReactNode;
};

type ContextType = {
  openModal: () => void;
  closeModal: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isVisible: boolean;
  isLoading: boolean;
  value: string;
};

const CodeContext = createContext({} as ContextType);
export default CodeContext;

export const CodeContextProvider = ({ children }: ContextProviderProps) => {
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setVisibility] = useState<boolean>(false);

  const closeModal = () => {
    return setVisibility(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const openModal = () => {
    return setVisibility(true);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!code) return toast.error("Preencha todos os campos");

    try {
      await sendVerificationCode(code);
    } catch {
      return;
    } finally {
      setIsLoading(false); // sempre será chamado
    }
  };

  return (
    <CodeContext.Provider
      value={{
        closeModal,
        onChange,
        onSubmit,
        openModal,
        isVisible,
        isLoading,
        value: code,
      }}
    >
      {children}
    </CodeContext.Provider>
  );
};
