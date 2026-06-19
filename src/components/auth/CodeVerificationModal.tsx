import { useContext, useRef } from "react";
import { Modal } from "../Modal";
import CodeContext from "../../context/CodeContext";
import Input from "../Input";
import Button from "../Button";

export default function CodeVerificationModal() {
  const {
    isVisible,
    closeModal,
    onChange,
    onSubmit,
    codeValue,
    emailValue,
    isLoading,
  } = useContext(CodeContext);

  const codeInputRef = useRef<HTMLInputElement>(null);

  return (
    <Modal isOpen={isVisible} onClose={closeModal}>
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
        onClick={closeModal}
        aria-label="Fechar"
      >
        ✕
      </button>

      <h2 className="text-xl font-semibold mb-4 text-green-900">
        Verificar Código
      </h2>
      <p className="text-gray-700 mb-4">
        Um código de verificação foi enviado para{" "}
        <span className="font-semibold">{emailValue}</span>. Por favor,
        insira-o abaixo.
      </p>

      <form
        autoComplete="off"
        onSubmit={onSubmit}
        className="flex flex-col gap-4"
      >
        <Input
          readOnly
          value={emailValue}
          type="email"
          id="email"
          name="email"
        />
        <Input
          ref={codeInputRef}
          onChange={onChange}
          value={codeValue}
          type="text"
          id="code"
          name="code"
          placeholder="Ex: 123456"
          required
        />
        <Button disabled={isLoading} variant="default" type="submit">
          {isLoading ? "Verificando..." : "Verificar"}
        </Button>
      </form>
    </Modal>
  );
}
