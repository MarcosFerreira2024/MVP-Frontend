import { useState, useEffect, useCallback } from "react";
import type { OutingResponse } from "../types/Outing";
import { useLoading } from "./useLoading"; // Import useLoading

function useOuting(slug: string) {
  const [outingData, setOutingData] = useState<OutingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isLoading, setIsLoading } = useLoading(); // Use global loading state

  // Memoize the fetch function to make it stable across renders
  const fetchOuting = useCallback(async () => {
    if (!slug) {
      // If slug is empty, reset data and return
      setOutingData(null);
      setError(null);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true); // Set global loading to true
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
      setIsLoading(false); // Set global loading to false
    }
  }, [slug, setIsLoading]); // Depend on slug and setIsLoading

  // Call fetchOuting when the component mounts or slug changes
  useEffect(() => {
    fetchOuting();
  }, [fetchOuting]); // Depend on the memoized fetchOuting

  return {
    outingData,
    loading: isLoading, // Return global loading state
    error,
    refetchOuting: fetchOuting, // Expose the refetch function
  };
}

export default useOuting;
