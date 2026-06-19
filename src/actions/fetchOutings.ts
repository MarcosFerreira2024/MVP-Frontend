import type { OutingResponse } from "../types/Outing";
import { API_URL } from "../helpers/api";

export type FetchOutingsResponse = {
  outings: OutingResponse[];
  totalItems: number;
};

export async function fetchOutings(
  take: number,
  page: number,
  searchParams?: { [key: string]: string | undefined }
): Promise<FetchOutingsResponse> {
  const query = new URLSearchParams();
  query.append("take", take.toString());
  query.append("page", page.toString());

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        query.append(key, value);
      }
    });
  }
  console.log(searchParams);
  try {
    const response = await fetch(
      `${API_URL}/outing?${query.toString()}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (
      !data ||
      !Array.isArray(data.items) ||
      typeof data.totalItems !== "number"
    ) {
      console.error("Invalid API response structure:", data);
      throw new Error(
        "Invalid API response: Expected an object with 'items' array and 'totalItems' number."
      );
    }

    return {
      outings: data.items,
      totalItems: data.totalItems,
    };
  } catch (error: unknown) {
    console.error("Error fetching outings:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to fetch outings");
  }
}
