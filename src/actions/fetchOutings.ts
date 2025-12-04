import type { OutingResponse } from "../types/Outing";

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
      `http://localhost:3333/outing?${query.toString()}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Expecting data to be an object like { items: [...], totalItems: N }
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
      outings: data.items, // Access data.items instead of data.outings
      totalItems: data.totalItems,
    };
  } catch (error: any) {
    console.error("Error fetching outings:", error.message);
    throw new Error(error.message || "Failed to fetch outings");
  }
}
