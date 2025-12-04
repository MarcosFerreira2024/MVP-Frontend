import React, {
  createContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  fetchOutings,
  type FetchOutingsResponse,
} from "../actions/fetchOutings";
import { useLoading } from "../hooks/useLoading";

interface OutingsContextType {
  getOutings: (
    take: number,
    page: number,
    searchParams?: { [key: string]: string | undefined }
  ) => Promise<FetchOutingsResponse>;
  isLoading: boolean;
  error: string | null;
}

export const OutingsContext = createContext<OutingsContextType | undefined>(
  undefined
);

export const OutingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isLoading, setIsLoading } = useLoading();
  const [cache, setCache] = useState<Map<string, FetchOutingsResponse>>(
    new Map()
  );
  const [error, setError] = useState<string | null>(null);

  const generateCacheKey = useCallback(
    (
      take: number,
      page: number,
      searchParams?: { [key: string]: string | undefined }
    ): string => {
      const params = new URLSearchParams();
      params.append("take", String(take));
      params.append("page", String(page));
      if (searchParams) {
        Object.entries(searchParams).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            params.append(key, value);
          }
        });
      }
      return params.toString();
    },
    []
  );

  const getOutings = useCallback(
    async (
      take: number,
      page: number,
      searchParams?: { [key: string]: string | undefined }
    ): Promise<FetchOutingsResponse> => {
      const cacheKey = generateCacheKey(take, page, searchParams);

      if (cache.has(cacheKey)) {
        return cache.get(cacheKey)!;
      }

      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchOutings(take, page, searchParams);
        console.log(data);
        setCache((prevCache) => new Map(prevCache).set(cacheKey, data));
        return data;
      } catch (err: any) {
        console.log(err);
        setError(err.message || "Failed to fetch outings.");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [cache, generateCacheKey, setIsLoading]
  );

  const contextValue = React.useMemo(
    () => ({ getOutings, isLoading, error }),
    [getOutings, isLoading, error]
  );

  return (
    <OutingsContext.Provider value={contextValue}>
      {children}
    </OutingsContext.Provider>
  );
};
