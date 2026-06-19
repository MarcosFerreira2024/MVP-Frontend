import { useEffect, useState, useCallback } from "react";
import { useOutings } from "../hooks/useOutings";
import { API_URL } from "../helpers/api";
import type { OutingResponse } from "../types/Outing";

export function useOutingsByCategory(categoryName: string, take: number) {
  const { getOutings, isLoading, error: contextError } = useOutings();

  const [rawOutings, setRawOutings] = useState<OutingResponse[]>([]);
  const loading = isLoading;
  const error = contextError;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOutings(take, 1, { category: categoryName });
        const allOutings: OutingResponse[] = response.outings || [];
        setRawOutings(allOutings);
      } catch (error: unknown) {
        console.error(error);
      }
    };
    fetchData();
  }, [getOutings, take, categoryName]);

  const silentRefetch = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/outing?take=${take}&page=1&category=${categoryName}`);
      const data = await res.json();
      const allOutings: OutingResponse[] = data.items || [];
      setRawOutings(allOutings);
    } catch {
      console.warn(`silentRefetch ${categoryName} failed`);
    }
  }, [take, categoryName]);

  const patchItem = useCallback((updated: OutingResponse) => {
    setRawOutings((prev) =>
      prev.map((o) => (o.id === updated.id ? updated : o))
    );
  }, []);

  return { rawOutings, loading, error, silentRefetch, patchItem };
}
