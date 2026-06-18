import { useState, useEffect, useCallback } from "react";
import type { OutingResponse } from "../types/Outing";

function useOuting(slug: string) {
  const [outingData, setOutingData] = useState<OutingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOuting = useCallback(async () => {
    if (!slug) {
      setOutingData(null);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3333/outing/${slug}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: OutingResponse = await response.json();
      setOutingData(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  const silentRefetch = useCallback(async () => {
    if (!slug) return;
    try {
      const response = await fetch(`http://localhost:3333/outing/${slug}`);
      if (response.ok) {
        const data: OutingResponse = await response.json();
        setOutingData(data);
      }
    } catch (e) {}
  }, [slug]);

  const removeRating = useCallback((ratingId: string) => {
    setOutingData((prev) =>
      prev
        ? { ...prev, ratings: prev.ratings.filter((r) => r.id !== ratingId) }
        : prev
    );
  }, []);

  const patchOuting = useCallback((data: OutingResponse) => {
    setOutingData(data);
  }, []);

  useEffect(() => {
    fetchOuting();
  }, [fetchOuting]);

  return {
    outingData,
    loading,
    error,
    refetchOuting: fetchOuting,
    silentRefetch,
    removeRating,
    patchOuting,
  };
}

export default useOuting;
