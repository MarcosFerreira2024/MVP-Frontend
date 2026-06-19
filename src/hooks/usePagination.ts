import { useSearchParams } from "react-router-dom";

function buildPagination(current: number, total: number) {
  const pages: (number | "...")[] = [];
  pages.push(1);
  if (current > 4) pages.push("...");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let p = start; p <= end; p++) pages.push(p);
  if (current < total - 3) pages.push("...");
  if (total > 1) pages.push(total);
  return pages;
}

export function usePagination(totalItems: number, take: number) {
  const [params, setParams] = useSearchParams();

  const page = Number(params.get("page") ?? "1");
  const totalPages = Math.max(1, Math.ceil(totalItems / take));
  const pages = buildPagination(page, totalPages);

  const goToPage = (p: number) => {
    params.set("page", String(p));
    params.set("take", String(take));
    setParams(params);
  };

  return { page, totalPages, pages, goToPage };
}
