import { useState, useEffect, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import { updateOuting, type UpdateOutingPayload } from "../actions/updateOuting";
import type { OutingResponse } from "../types/Outing";

export type EditableField = {
  title: string;
  content: string;
  price: string;
  slug: string;
  latitude: string;
  longitude: string;
  cityId: number;
  difficulty: string;
  duration: string;
  distance: string;
  roundTrip: boolean;
  biodiversity: string;
  maximumCapacityPark: string;
  maximumCapacityEvent: string;
  startDate: string;
  endDate: string;
  photosJson: string;
  openHoursJson: string;
};

const initial: EditableField = {
  title: "",
  content: "",
  price: "",
  slug: "",
  latitude: "",
  longitude: "",
  cityId: 1,
  difficulty: "EASY",
  duration: "",
  distance: "",
  roundTrip: true,
  biodiversity: "",
  maximumCapacityPark: "",
  maximumCapacityEvent: "",
  startDate: "",
  endDate: "",
  photosJson: "",
  openHoursJson: "",
};

function toDatetimeLocal(iso: string | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

function photosToJson(photos: { id: string; alt: string; url: string }[] | undefined): string {
  if (!photos || photos.length === 0) return "";
  return JSON.stringify(photos.map(({ alt, url }) => ({ alt, url })), null, 2);
}

function openHoursToJson(oh: { id: string; dayOfWeek: number; openTime: string; closeTime: string }[] | undefined): string {
  if (!oh || oh.length === 0) return "";
  return JSON.stringify(oh.map(({ dayOfWeek, openTime, closeTime }) => ({ dayOfWeek, openTime, closeTime })), null, 2);
}

type ValidationErrors = Record<string, string>;

function validate(form: EditableField, categoryName: string): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!form.title.trim()) errors.title = "Título é obrigatório.";
  if (!form.content.trim()) errors.content = "Descrição é obrigatória.";

  const price = Number(form.price);
  if (isNaN(price)) errors.price = "Preço deve ser um número válido.";

  if (!form.slug.trim()) errors.slug = "Slug é obrigatório.";
  else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.slug.trim()))
    errors.slug = "Slug deve conter apenas letras minúsculas, números e hífens.";

  if (!form.latitude.trim()) errors.latitude = "Latitude é obrigatória.";
  else if (isNaN(Number(form.latitude))) errors.latitude = "Latitude deve ser um número válido.";

  if (!form.longitude.trim()) errors.longitude = "Longitude é obrigatória.";
  else if (isNaN(Number(form.longitude))) errors.longitude = "Longitude deve ser um número válido.";

  if (categoryName === "Trilha") {
    if (!form.duration || Number(form.duration) <= 0)
      errors.duration = "Duração deve ser um número positivo.";
    if (!form.distance || Number(form.distance) <= 0)
      errors.distance = "Distância deve ser um número positivo.";
  }

  if (categoryName === "Parque") {
    if (!form.maximumCapacityPark || Number(form.maximumCapacityPark) <= 0)
      errors.maximumCapacityPark = "Capacidade máxima deve ser um número positivo.";
  }

  if (categoryName === "Evento") {
    if (!form.maximumCapacityEvent || Number(form.maximumCapacityEvent) <= 0)
      errors.maximumCapacityEvent = "Capacidade máxima deve ser um número positivo.";
    if (!form.startDate) errors.startDate = "Data inicial é obrigatória.";
    if (!form.endDate) errors.endDate = "Data final é obrigatória.";
    if (form.startDate && form.endDate && new Date(form.startDate) >= new Date(form.endDate))
      errors.endDate = "Data final deve ser posterior à data inicial.";
  }

  if (form.photosJson.trim()) {
    try {
      const parsed = JSON.parse(form.photosJson);
      if (!Array.isArray(parsed) || !parsed.every((p: unknown) =>
        typeof p === "object" && p !== null && "alt" in (p as Record<string, unknown>) && "url" in (p as Record<string, unknown>)
      )) {
        errors.photosJson = "JSON de fotos deve ser um array de objetos com alt e url.";
      }
    } catch {
      errors.photosJson = "JSON de fotos inválido.";
    }
  }

  if (form.openHoursJson.trim()) {
    try {
      const parsed = JSON.parse(form.openHoursJson);
      if (!Array.isArray(parsed) || !parsed.every((o: unknown) => {
        if (typeof o !== "object" || o === null) return false;
        const obj = o as Record<string, unknown>;
        return typeof obj.dayOfWeek === "number" &&
          typeof obj.openTime === "string" &&
          typeof obj.closeTime === "string";
      })) {
        errors.openHoursJson = "JSON de horários deve ser um array de objetos com dayOfWeek, openTime e closeTime.";
      }
    } catch {
      errors.openHoursJson = "JSON de horários inválido.";
    }
  }

  return errors;
}

function useOutingEdit(outing: OutingResponse | null, onClose: () => void, onSuccess: (data?: Record<string, unknown>) => void) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<EditableField>(initial);
  const prevOutingId = useRef<string | null>(null);

  useEffect(() => {
    const id = outing?.id ?? null;
    if (id === prevOutingId.current) return;
    prevOutingId.current = id;

    if (!outing) {
      setForm(initial);
      return;
    }
    setForm({
      title: outing.title,
      content: outing.content,
      price: String(outing.price ?? ""),
      slug: outing.slug,
      latitude: String(outing.location?.latitude ?? ""),
      longitude: String(outing.location?.longitude ?? ""),
      cityId: outing.location?.city?.id ?? 1,
      difficulty: outing.trail?.difficulty ?? "EASY",
      duration: String(outing.trail?.duration ?? ""),
      distance: String(outing.trail?.distance ?? ""),
      roundTrip: outing.trail?.roundTrip ?? true,
      biodiversity: outing.park?.biodiversity ?? "",
      maximumCapacityPark: String(outing.park?.maximumCapacity ?? ""),
      maximumCapacityEvent: String(outing.events?.[0]?.maximumCapacity ?? ""),
      startDate: toDatetimeLocal(outing.events?.[0]?.startDate),
      endDate: toDatetimeLocal(outing.events?.[0]?.endDate),
      photosJson: photosToJson(outing.photos),
      openHoursJson: openHoursToJson(outing.openHours),
    });
  }, [outing]);

  const set = (field: keyof EditableField) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const hasChanges = useCallback((catName: string): boolean => {
    if (!outing) return false;

    if (form.title !== outing.title) return true;
    if (form.content !== outing.content) return true;
    if (Number(form.price) !== outing.price) return true;
    if (form.slug !== outing.slug) return true;

    const lat = Number(form.latitude);
    const lng = Number(form.longitude);
    if (lat !== outing.location?.latitude || lng !== outing.location?.longitude || form.cityId !== outing.location?.city?.id)
      return true;

    const origPhotosJson = photosToJson(outing.photos);
    if (form.photosJson !== origPhotosJson) return true;

    const origOhJson = openHoursToJson(outing.openHours);
    if (form.openHoursJson !== origOhJson) return true;

    if (catName === "Trilha") {
      if (form.difficulty !== (outing.trail?.difficulty ?? "EASY")) return true;
      if (Number(form.duration) !== (outing.trail?.duration ?? 0)) return true;
      if (Number(form.distance) !== (outing.trail?.distance ?? 0)) return true;
      if (form.roundTrip !== (outing.trail?.roundTrip ?? true)) return true;
    }

    if (catName === "Parque") {
      if (form.biodiversity !== (outing.park?.biodiversity ?? "")) return true;
      if (Number(form.maximumCapacityPark) !== (outing.park?.maximumCapacity ?? 0)) return true;
    }

    if (catName === "Evento") {
      if (Number(form.maximumCapacityEvent) !== (outing.events?.[0]?.maximumCapacity ?? 0)) return true;
      if (toDatetimeLocal(outing.events?.[0]?.startDate) !== form.startDate) return true;
      if (toDatetimeLocal(outing.events?.[0]?.endDate) !== form.endDate) return true;
    }

    return false;
  }, [form, outing]);

  const handleSubmit = useCallback(async () => {
    if (!outing) return;

    const catName = outing.category?.name ?? "";
    const errors = validate(form, catName);
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      toast.error(errors[errorKeys[0]]);
      setLoading(false);
      return;
    }

    if (!hasChanges(catName)) {
      toast.error("Nenhuma alteração detectada.");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const payload: UpdateOutingPayload = {};

      if (form.title !== outing.title) payload.title = form.title;
      if (form.content !== outing.content) payload.content = form.content;
      if (Number(form.price) !== outing.price) payload.price = Number(form.price);
      if (form.slug !== outing.slug) payload.slug = form.slug;

      const lat = Number(form.latitude);
      const lng = Number(form.longitude);
      if (lat !== outing.location?.latitude || lng !== outing.location?.longitude || form.cityId !== outing.location?.city?.id) {
        payload.location = { latitude: lat, longitude: lng, cityId: form.cityId };
      }

      if (form.photosJson.trim()) {
        const parsed = JSON.parse(form.photosJson);
        payload.photos = parsed.map((p: { alt: string; url: string }) => ({ alt: p.alt, url: p.url }));
      }

      if (form.openHoursJson.trim()) {
        const parsed = JSON.parse(form.openHoursJson);
        payload.openHours = parsed.map((o: { dayOfWeek: number; openTime: string; closeTime: string }) => ({
          dayOfWeek: o.dayOfWeek,
          openTime: o.openTime,
          closeTime: o.closeTime,
        }));
      }

      if (catName === "Trilha") {
        payload.trail = {
          difficulty: form.difficulty,
          duration: Number(form.duration),
          distance: Number(form.distance),
          roundTrip: form.roundTrip,
        };
      } else if (catName === "Parque") {
        payload.park = {
          biodiversity: form.biodiversity,
          maximumCapacity: Number(form.maximumCapacityPark),
        };
      } else if (catName === "Evento") {
        payload.event = {
          maximumCapacity: Number(form.maximumCapacityEvent),
          startDate: new Date(form.startDate).toISOString(),
          endDate: new Date(form.endDate).toISOString(),
        };
      }

      const result = await updateOuting(outing.id, payload);
      toast.success("Passeio atualizado com sucesso!");
      onSuccess(result);
      onClose();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Erro ao atualizar passeio.");
    } finally {
      setLoading(false);
    }
  }, [form, outing, onClose, onSuccess, hasChanges]);

  const setBool = (field: keyof EditableField) => (val: boolean) => {
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  return { form, set, setBool, handleSubmit, loading };
}

export default useOutingEdit;
