import { z } from "zod";

export const formatZodErrors = (issues: z.ZodIssue[]): Map<string, string> => {
  const errors: Map<string, string> = new Map();
  for (const issue of issues) {
    const fieldName = String(issue.path[0]);
    if (!errors.has(fieldName)) {
      errors.set(fieldName, issue.message);
    }
  }
  return errors;
};
