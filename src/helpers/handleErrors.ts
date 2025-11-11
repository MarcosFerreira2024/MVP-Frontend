import toast from "react-hot-toast";
import { ZodError } from "zod";

function handleErrors(error: unknown) {
  if (error instanceof ZodError) {
    return toast.error(error.issues[0].message);
  } else if (error instanceof Error) {
    return toast.error(error.message);
  } else {
    return toast.error("Ocorreu um erro inesperado, tente novamente.");
  }
}

export default handleErrors;
