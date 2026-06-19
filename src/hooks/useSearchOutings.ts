import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useOutings } from "../hooks/useOutings";
import { formatPrice } from "../helpers/formatPrice";
import { API_URL } from "../helpers/api";
import type { OutingCardProps } from "../components/outing/OutingCard";
import type { OutingResponse } from "../types/Outing";

const TAKE_PER_PAGE = 12;

const transformOutingResponseToOutingCardProps = (
  outing: OutingResponse,
): OutingCardProps => {
  const totalRating = outing.ratings.reduce((sum, r) => sum + r.rating, 0);
  const rating =
    outing.ratings.length > 0
      ? (totalRating / outing.ratings.length).toFixed(1)
      : "0.0";
  const ratingCount = outing.ratings.length;

  return {
    id: outing.id,
    rating,
    ratingCount,
    title: outing.title,
    description: outing.content,
    price: formatPrice(outing.price),
    to: `/outing/${outing.slug}`,
    images: outing.photos.map((photo) => photo.url),
  };
};

export function useSearchOutings() {
  const [searchParams] = useSearchParams();
  const { getOutings, isLoading, error: contextError } = useOutings();

  const title = searchParams.get("title");
  const sortBy = searchParams.get("sortBy");
  const orderBy = searchParams.get("orderBy");
  const page = searchParams.get("page");
  const category = searchParams.get("category");
  const currentPage = parseInt(page || "1");

  const [outings, setOutings] = useState<OutingCardProps[]>([]);
  const [rawOutings, setRawOutings] = useState<OutingResponse[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const buildParams = useCallback(() => {
    const params = new URLSearchParams({
      take: String(TAKE_PER_PAGE),
      page: String(currentPage),
    });
    if (sortBy) params.set("sortBy", sortBy);
    if (orderBy) params.set("orderBy", orderBy);
    if (title) params.set("title", title);
    if (category && category !== "all") params.set("category", category);
    return params;
  }, [currentPage, sortBy, orderBy, title, category]);

  const fetchSearchOutings = useCallback(async () => {
    setHasSearched(false);
    try {
      const data = await getOutings(TAKE_PER_PAGE, currentPage, {
        sortBy: sortBy ?? undefined,
        orderBy: orderBy ?? undefined,
        title: title ?? undefined,
        category: category === "all" ? undefined : (category ?? undefined),
      });
      if (
        data &&
        Array.isArray(data.outings) &&
        typeof data.totalItems === "number"
      ) {
        setRawOutings(data.outings);
        setOutings(data.outings.map(transformOutingResponseToOutingCardProps));
        setTotalItems(data.totalItems);
      } else if (data && typeof data.totalItems === "number") {
        setRawOutings([]);
        setOutings([]);
        setTotalItems(data.totalItems);
      } else {
        setRawOutings([]);
        setOutings([]);
        setTotalItems(0);
      }
    } catch (err: unknown) {
      console.error(err);
      setRawOutings([]);
      setOutings([]);
      setTotalItems(0);
    } finally {
      setHasSearched(true);
    }
  }, [sortBy, orderBy, title, category, currentPage, getOutings]);

  const silentRefetch = useCallback(async () => {
    const params = buildParams();
    try {
      const res = await fetch(`${API_URL}/outing?${params}`);
      const data = await res.json();
      if (Array.isArray(data.outings)) {
        setRawOutings(data.outings);
        setOutings(data.outings.map(transformOutingResponseToOutingCardProps));
        setTotalItems(data.totalItems ?? 0);
      }
    } catch {
      console.warn("silentRefetch failed");
    }
  }, [buildParams]);

  useEffect(() => {
    fetchSearchOutings();
  }, [fetchSearchOutings]);

  return {
    outings,
    rawOutings,
    totalItems,
    hasSearched,
    isLoading,
    error: contextError,
    silentRefetch,
    TAKE_PER_PAGE,
  };
}
