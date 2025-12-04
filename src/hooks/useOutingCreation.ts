// src/hooks/useOutingCreation.ts
import React, { useEffect, useState, useCallback } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import {
  validateImageJson,
  outingStep1Schema,
  outingStep2Schema,
  outingStep3Schema,
} from "../helpers/validationSchemas";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { createOuting, type OutingPayload } from "../actions/createOuting"; // Importar a nova ação

// --- Definições de Tipos Comuns ---
export type DataItem = { id: number; name: string };
export type SetStringDispatch = React.Dispatch<React.SetStateAction<string>>;
export type SetDataItemDispatch = React.Dispatch<
  React.SetStateAction<DataItem>
>;
export type SetNumberDispatch = React.Dispatch<
  React.SetStateAction<number | string>
>;

// --- Dados de Referência ---
const categories: DataItem[] = [
  { id: 1, name: "Evento" },
  { id: 2, name: "Trilha" },
  { id: 3, name: "Parque" },
];
const cities: DataItem[] = [
  { id: 1, name: "Teresópolis" },
  { id: 2, name: "Petrópolis" },
  { id: 3, name: "Nova Friburgo" },
  { id: 4, name: "Guapimirim" },
  { id: 5, name: "Cachoeiras de Macacu" },
  { id: 6, name: "São José do Vale do Rio Preto" },
  { id: 7, name: "Sumidouro" },
  { id: 8, name: "Sapucaia" },
  { id: 9, name: "Areal" },
];

// Mapeamento de Categoria para URL
const categoryUrlMap: Record<string, string> = {
  Evento: "event",
  Trilha: "trail",
  Parque: "park",
};

// =================================================================
// 2. FUNÇÃO AUXILIAR DE ERROS
// =================================================================

// Converte o array de erros detalhados do Zod para um objeto simples { campo: mensagem }
const formatZodErrors = (issues: z.ZodIssue[]): Map<string, string> => {
  const errors: Map<string, string> = new Map();
  for (const issue of issues) {
    const fieldName = String(issue.path[0]); // Ensure fieldName is string
    if (!errors.has(fieldName)) {
      errors.set(fieldName, issue.message);
    }
  }
  return errors;
};

export const useOutingCreation = () => {
  const navigate = useNavigate(); // Inicializar useNavigate
  const maxStep = 3;
  const minStep = 1;

  const [currentStep, setCurrentStep] = useState(minStep);
  const [formErrors, setFormErrors] = useState<Map<string, string>>(new Map()); // Alterado para Map para robustez
  const [isStep3Valid, setIsStep3Valid] = useState(false);
  const [loading, setLoading] = useState(false); // Adicionado estado de loading para a API

  const canGoBack = currentStep > minStep;
  const canGoForward = currentStep < maxStep;

  // --- ESTADOS DO FORMULÁRIO ---
  // Passo 1
  const [city, setCity] = useState<DataItem>(cities[0]);
  const [category, setCategory] = useState<DataItem>(categories[0]);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [slug, setSlug] = useState("");
  // Passo 2
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [maximumCapacityEvent, setMaximumCapacityEvent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [duration, setDuration] = useState<number | string>("");
  const [distance, setDistance] = useState<number | string>("");
  const [roundTrip, setRoundTrip] = useState(true);
  const [biodiversity, setBiodiversity] = useState("");
  const [maximumCapacityPark, setMaximumCapacityPark] = useState("");
  // Passo 3
  const [imageJson, setImageJson] = useState("");

  // Função para resetar o formulário
  const resetForm = useCallback(() => {
    setCurrentStep(minStep);
    setFormErrors(new Map()); // Resetar para Map vazio
    setIsStep3Valid(false);
    // Passo 1
    setCity(cities[0]);
    setCategory(categories[0]);
    setDescription("");
    setTitle("");
    setPrice("");
    setSlug("");
    // Passo 2
    setLatitude("");
    setLongitude("");
    setMaximumCapacityEvent("");
    setStartDate("");
    setEndDate("");
    setDifficulty("EASY");
    setDuration("");
    setDistance("");
    setRoundTrip(true);
    setBiodiversity("");
    setMaximumCapacityPark("");
    // Passo 3
    setImageJson("");
  }, [minStep]);

  // --- FUNÇÃO DE VALIDAÇÃO ZOD ---
  const validateStep = useCallback(
    (step: number): boolean => {
      let schema: z.ZodSchema;
      let dataToValidate: any;

      if (step === 1) {
        schema = outingStep1Schema; // Usar o schema exportado
        dataToValidate = { title, description, city, category, price, slug };
      } else if (step === 2) {
        schema = outingStep2Schema; // Usar o schema exportado
        dataToValidate = {
          category,
          latitude,
          longitude,
          maximumCapacityEvent,
          startDate,
          endDate,
          duration,
          distance,
          biodiversity,
          maximumCapacityPark,
        };
      } else if (step === 3) {
        schema = outingStep3Schema; // Usar o schema exportado
        dataToValidate = { imageJson };
      } else {
        setFormErrors(new Map());
        return true;
      }

      const result = schema.safeParse(dataToValidate);

      if (result.success) {
        setFormErrors(new Map());
        return true;
      } else {
        const newErrors = formatZodErrors(result.error.issues);
        setFormErrors(newErrors);
        return false;
      }
    },
    [
      title,
      description,
      city,
      category,
      price,
      slug,
      latitude,
      longitude,
      maximumCapacityEvent,
      startDate,
      endDate,
      duration,
      distance,
      biodiversity,
      maximumCapacityPark,
      imageJson,
      setFormErrors,
    ]
  );

  // --- FUNÇÃO DE SUBMISSÃO FINAL ---
  const handleSubmit = useCallback(async () => {
    // 1. Validar todos os passos novamente antes de submeter
    let allStepsValid = true;
    for (let i = 1; i <= maxStep; i++) {
      if (!validateStep(i)) {
        allStepsValid = false;
        break;
      }
    }

    const finalImageJsonValidation = validateImageJson(imageJson);
    if (!finalImageJsonValidation.success) {
      toast.error(
        finalImageJsonValidation.message ||
          "Por favor, corrija os erros no JSON das imagens."
      );
      allStepsValid = false;
    }

    if (!allStepsValid) {
      console.log("Formulário contém erros. Por favor, revise.");
      return; // Parar se houver erros de validação
    }

    // 2. Construir o payload para a API
    let parsedImages: { alt: string; url: string }[] = [];
    try {
      parsedImages = JSON.parse(imageJson);
      if (
        !Array.isArray(parsedImages) ||
        parsedImages.some((img) => !img.url || !img.alt)
      ) {
        throw new Error("JSON de imagens inválido.");
      }
    } catch (e) {
      toast.error("Formato do JSON de imagens inválido.");
      return;
    }

    const outingPayload: OutingPayload = {
      title,
      content: description, // 'content' from 'description'
      price: parseFloat(price), // Parse price to number
      slug,
      publicAudience: "ALL", // Hardcoded as per example, no UI for this yet
      categoryId: String(category.id), // Use category ID, explicitly converted to string
      location: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        cityId: city.id, // Use city ID
      },
      photos: parsedImages,
      openHours: [], // No UI for this yet, defaulting to empty array
    };

    // 3. Adicionar dados específicos da categoria
    if (category.name === "Trilha") {
      outingPayload.trail = {
        difficulty,
        duration: Number(duration),
        distance: Number(distance),
        roundTrip,
      };
    } else if (category.name === "Parque") {
      outingPayload.park = {
        biodiversity,
        maximumCapacity: Number(maximumCapacityPark),
      };
    } else if (category.name === "Evento") {
      outingPayload.event = {
        maximumCapacity: Number(maximumCapacityEvent),
        startDate: new Date(startDate).toISOString(), // Format to ISO string
        endDate: new Date(endDate).toISOString(), // Format to ISO string
      };
    }

    // 4. Chamar a API
    setLoading(true);
    try {
      // Passar o categoryPath como segundo argumento para createOuting
      const categoryPath = categoryUrlMap[category.name];
      if (!categoryPath) {
        throw new Error("Categoria inválida para criação de passeio.");
      }
      await createOuting(outingPayload, categoryPath);
      toast.success("Passeio criado com sucesso!");
      resetForm(); // Limpar o formulário
      // Redirecionamento dinâmico
      navigate(`/outing/${categoryPath}`);
    } catch (error: any) {
      console.error("Erro ao criar passeio:", error);
      toast.error(error.message || "Falha ao criar passeio.");
    } finally {
      setLoading(false);
    }
  }, [
    title,
    description,
    price,
    slug,
    city,
    category,
    latitude,
    longitude,
    maximumCapacityEvent,
    startDate,
    endDate,
    duration,
    distance,
    biodiversity,
    maximumCapacityPark,
    imageJson,
    maxStep,
    validateStep, // memoized validateStep
    resetForm,
    navigate,
    setLoading,
  ]);

  function increaseStep() {
    if (currentStep === maxStep) {
      handleSubmit();
    } else {
      if (validateStep(currentStep)) {
        if (currentStep === 3 && !isStep3Valid) {
          toast.error("Por favor, corrija os erros no JSON das imagens.");
          return;
        }
        if (canGoForward) {
          setCurrentStep(currentStep + 1);
        }
      }
    }
  }

  function decreaseStep() {
    if (canGoBack) {
      setCurrentStep(currentStep - 1);
    }
    setFormErrors(new Map()); // Resetar para Map vazio
  }

  useEffect(() => {
    if (formErrors.size > 0) {
      // Verifica se há erros no Map
      const firstErrorMessage = formErrors.values().next().value; // Pega o primeiro valor
      if (firstErrorMessage) {
        toast.error(firstErrorMessage);
      }
    }
  }, [formErrors]);

  const step1Props = {
    title,
    setTitle,
    city,
    setCity,
    cities,
    category,
    setCategory,
    categories,
    description,
    setDescription,
    price,
    setPrice,
    slug,
    setSlug,
    errors: formErrors,
  };

  const step2Props = {
    category,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    maximumCapacityEvent,
    setMaximumCapacityEvent,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    difficulty,
    setDifficulty,
    duration,
    setDuration,
    distance,
    setDistance,
    roundTrip,
    setRoundTrip,
    biodiversity,
    setBiodiversity,
    maximumCapacityPark,
    setMaximumCapacityPark,
    errors: formErrors,
  };

  const step3Props = {
    imageJson,
    setImageJson,
    setIsValid: setIsStep3Valid,
  };

  return {
    maxStep,
    minStep,
    currentStep,
    formErrors,
    canGoBack,
    canGoForward,
    increaseStep,
    decreaseStep,
    step1Props,
    step2Props,
    step3Props,
    loading, // Expor o estado de loading
    resetForm, // Expor resetForm
  };
};
