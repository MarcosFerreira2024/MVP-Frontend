import { ZodError } from "zod";

function handleErrors(error: unknown): string {
  if (error instanceof ZodError) {
    return error.issues[0].message;
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return "Ocorreu um erro inesperado, tente novamente.";
  }
}

export default handleErrors;
