import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .min(1, "Senha é obrigatória"),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    password: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .min(1, "Senha é obrigatória"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

const imageSchema = z.object({
  url: z.string().url("URL da imagem inválida").min(1, "URL da imagem é obrigatória"),
  alt: z.string().min(1, "Texto alternativo da imagem é obrigatório"),
});

export const imageJsonSchema = z.array(imageSchema).min(1, "Deve haver pelo menos uma imagem.");

export const validateImageJson = (jsonString: string) => {
  try {
    const parsed = JSON.parse(jsonString);
    imageJsonSchema.parse(parsed);
    return { success: true, message: "JSON de imagens válido." };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    }
    // Handle case where JSON.parse fails (e.g., empty string, malformed JSON)
    return { success: false, message: "Formato JSON inválido." };
  }
};

// Re-defining step1Schema for useOutingCreation.ts, as it was not exported before.
// Also, adding more robust validation as discussed.
export const outingStep1Schema = z.object({
  title: z.string().trim().min(5, "O título deve ter pelo menos 5 caracteres.").max(100, "O título não deve exceder 100 caracteres."),
  description: z
    .string()
    .trim()
    .min(50, "A descrição deve ter pelo menos 50 caracteres.")
    .max(1000, "A descrição não deve exceder 1000 caracteres."),
  price: z.string().refine((val) => {
    const num = Number(val);
    return !isNaN(num) && num >= 0;
  }, "O preço deve ser um número positivo válido (ou 0 para grátis)."),
  slug: z.string()
    .trim()
    .min(3, "O slug é obrigatório e deve ter pelo menos 3 caracteres.")
    .max(100, "O slug não deve exceder 100 caracteres.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "O slug deve conter apenas letras minúsculas, números e hífens."),
  city: z.object({ id: z.number(), name: z.string() }), // Assuming DataItem structure
  category: z.object({ id: z.number(), name: z.string() }), // Assuming DataItem structure
});

// Re-defining step2Schema for useOutingCreation.ts
export const outingStep2Schema = z
  .object({
    category: z.object({ id: z.number(), name: z.string() }),
    latitude: z.string().trim().min(1, "A Latitude é obrigatória."),
    longitude: z.string().trim().min(1, "A Longitude é obrigatória."),

    maximumCapacityEvent: z.union([z.string(), z.number()]).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    duration: z.union([z.string(), z.number()]).optional(),
    distance: z.union([z.string(), z.number()]).optional(),
    biodiversity: z.string().optional(),
    maximumCapacityPark: z.union([z.string(), z.number()]).optional(),
  })
  .superRefine((data, ctx) => {
    const categoryName = data.category.name;

    // Lógica para Evento
    if (categoryName === "Evento") {
      const capacity = Number(data.maximumCapacityEvent);
      if (isNaN(capacity) || capacity <= 0) {
        ctx.addIssue({ code: "custom", message: "Capacidade máxima do evento deve ser um número positivo.", path: ["maximumCapacityEvent"] });
      }
      const start = new Date(data.startDate || '');
      const end = new Date(data.endDate || '');
      if (!data.startDate || !data.endDate || isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
        ctx.addIssue({ code: "custom", message: "Datas inválidas: Início e Fim são obrigatórios, e o início deve ser anterior ao fim.", path: ["startDate"] });
      }
    }

    // Lógica para Trilha
    else if (categoryName === "Trilha") {
      const durationNum = Number(data.duration);
      if (isNaN(durationNum) || durationNum <= 0) {
        ctx.addIssue({ code: "custom", message: "A duração da trilha (minutos) é obrigatória e deve ser maior que zero.", path: ["duration"] });
      }
      const distanceNum = Number(data.distance);
      if (isNaN(distanceNum) || distanceNum <= 0) {
        ctx.addIssue({ code: "custom", message: "A distância da trilha (km) é obrigatória e deve ser maior que zero.", path: ["distance"] });
      }
    }

    // Lógica para Parque
    else if (categoryName === "Parque") {
      if (!data.biodiversity?.trim()) { // Use optional chaining for trim
        ctx.addIssue({ code: "custom", message: "O nível de biodiversidade é obrigatório.", path: ["biodiversity"] });
      }
      const capacityParkNum = Number(data.maximumCapacityPark);
      if (isNaN(capacityParkNum) || capacityParkNum <= 0) {
        ctx.addIssue({ code: "custom", message: "Capacidade máxima do parque deve ser um número positivo.", path: ["maximumCapacityPark"] });
      }
    }
  });

// Re-defining step3Schema for useOutingCreation.ts
export const outingStep3Schema = z.object({
    imageJson: z.string().refine((val) => {
        try {
            const parsed = JSON.parse(val);
            return imageJsonSchema.safeParse(parsed).success;
        } catch (e) {
            return false;
        }
    }, {
        message: "O JSON das imagens é inválido. Ele deve ser um array de objetos com 'url' e 'alt'.",
    }),
});
