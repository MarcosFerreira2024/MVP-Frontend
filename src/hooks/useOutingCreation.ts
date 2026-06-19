import { useEffect, useState, useCallback } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useFormState, maxStep, minStep } from "./useFormState";
import type { OutingFormState } from "./useFormState";
import { formatZodErrors } from "../helpers/formatZodErrors";
import { buildAndSubmitOuting } from "../helpers/buildOutingPayload";
import { categories, cities } from "../helpers/parks";
import { validateImageJson, outingStep1Schema, outingStep2Schema, outingStep3Schema } from "../helpers/validationSchemas";

export type { DataItem, SetStringDispatch, SetDataItemDispatch, SetNumberDispatch } from "./useFormState";

function buildStepData(state: OutingFormState, step: number) {
  if (step === 1) {
    return { title: state.title, description: state.description, city: state.city, category: state.category, price: state.price, slug: state.slug };
  }
  if (step === 2) {
    return {
      category: state.category,
      latitude: state.latitude,
      longitude: state.longitude,
      maximumCapacityEvent: state.maximumCapacityEvent,
      startDate: state.startDate,
      endDate: state.endDate,
      duration: state.duration,
      distance: state.distance,
      biodiversity: state.biodiversity,
      maximumCapacityPark: state.maximumCapacityPark,
    };
  }
  if (step === 3) {
    return { imageJson: state.imageJson };
  }
  return {};
}

function getSchema(step: number): z.ZodSchema {
  if (step === 1) return outingStep1Schema;
  if (step === 2) return outingStep2Schema;
  if (step === 3) return outingStep3Schema;
  return z.object({});
}

export const useOutingCreation = () => {
  const navigate = useNavigate();
  const { formState, setters, resetForm } = useFormState();
  const { setImageJson } = setters;

  const [currentStep, setCurrentStep] = useState(minStep);
  const [formErrors, setFormErrors] = useState<Map<string, string>>(new Map());
  const [isStep3Valid, setIsStep3Valid] = useState(false);
  const [loading, setLoading] = useState(false);

  const canGoBack = currentStep > minStep;
  const canGoForward = currentStep < maxStep;

  const validateStep = useCallback(
    (step: number): boolean => {
      const schema = getSchema(step);
      const dataToValidate = buildStepData(formState, step);
      const result = schema.safeParse(dataToValidate);

      if (result.success) {
        setFormErrors(new Map());
        return true;
      }
      const newErrors = formatZodErrors(result.error.issues);
      setFormErrors(newErrors);
      return false;
    },
    [
      formState.title,
      formState.description,
      formState.city,
      formState.category,
      formState.price,
      formState.slug,
      formState.latitude,
      formState.longitude,
      formState.maximumCapacityEvent,
      formState.startDate,
      formState.endDate,
      formState.duration,
      formState.distance,
      formState.biodiversity,
      formState.maximumCapacityPark,
      formState.imageJson,
      setFormErrors,
    ]
  );

  const handleSubmit = useCallback(async () => {
    let allStepsValid = true;
    for (let i = 1; i <= maxStep; i++) {
      if (!validateStep(i)) {
        allStepsValid = false;
        break;
      }
    }

    const finalImageJsonValidation = validateImageJson(formState.imageJson);
    if (!finalImageJsonValidation.success) {
      toast.error(
        finalImageJsonValidation.message ||
          "Por favor, corrija os erros no JSON das imagens."
      );
      allStepsValid = false;
    }

    if (!allStepsValid) return;

    setLoading(true);
    try {
      await buildAndSubmitOuting(formState, formState.imageJson, navigate, resetForm);
    } catch (error: unknown) {
      console.error("Erro ao criar passeio:", error);
      toast.error(error instanceof Error ? error.message : "Falha ao criar passeio.");
    } finally {
      setLoading(false);
    }
  }, [formState, navigate, resetForm, validateStep, setLoading]);

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
    setFormErrors(new Map());
  }

  useEffect(() => {
    if (formErrors.size > 0) {
      const firstErrorMessage = formErrors.values().next().value;
      if (firstErrorMessage) {
        toast.error(firstErrorMessage);
      }
    }
  }, [formErrors]);

  const step1Props = {
    title: formState.title,
    setTitle: setters.setTitle,
    city: formState.city,
    setCity: setters.setCity,
    cities,
    category: formState.category,
    setCategory: setters.setCategory,
    categories,
    description: formState.description,
    setDescription: setters.setDescription,
    price: formState.price,
    setPrice: setters.setPrice,
    slug: formState.slug,
    setSlug: setters.setSlug,
    errors: formErrors,
  };

  const step2Props = {
    category: formState.category,
    latitude: formState.latitude,
    setLatitude: setters.setLatitude,
    longitude: formState.longitude,
    setLongitude: setters.setLongitude,
    maximumCapacityEvent: formState.maximumCapacityEvent,
    setMaximumCapacityEvent: setters.setMaximumCapacityEvent,
    startDate: formState.startDate,
    setStartDate: setters.setStartDate,
    endDate: formState.endDate,
    setEndDate: setters.setEndDate,
    difficulty: formState.difficulty,
    setDifficulty: setters.setDifficulty,
    duration: formState.duration,
    setDuration: setters.setDuration,
    distance: formState.distance,
    setDistance: setters.setDistance,
    roundTrip: formState.roundTrip,
    setRoundTrip: setters.setRoundTrip,
    biodiversity: formState.biodiversity,
    setBiodiversity: setters.setBiodiversity,
    maximumCapacityPark: formState.maximumCapacityPark,
    setMaximumCapacityPark: setters.setMaximumCapacityPark,
    errors: formErrors,
  };

  const step3Props = {
    imageJson: formState.imageJson,
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
    loading,
    resetForm,
  };
};
