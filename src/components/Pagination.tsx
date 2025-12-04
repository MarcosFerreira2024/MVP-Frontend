import { useSearchParams } from "react-router-dom";

type Props = {
  totalItems: number;
  take: number;
};

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

export function Pagination({ totalItems, take }: Props) {
  const [params, setParams] = useSearchParams();

  const page = Number(params.get("page") ?? "1");
  const totalPages = Math.max(1, Math.ceil(totalItems / take));

  const pages = buildPagination(page, totalPages);

  function goToPage(p: number) {
    params.set("page", String(p));
    params.set("take", String(take));
    setParams(params);
  }

  return (
    <div className="flex items-center gap-2 mt-6">
      {pages.map((p, i) =>
        p === "..." ? (
          <div key={i} className="px-2 text-gray-600 select-none">
            …
          </div>
        ) : (
          <button
            key={i}
            onClick={() => goToPage(p)}
            className={`
              rounded-xl border 
              px-3 py-1 text-sm font-semibold
              transition-colors duration-300
              h-[36px]
              w-[36px]
              text-center flex items-center justify-center
              ${
                p === page
                  ? "bg-green-900 text-white border-green-900"
                  : "bg-gray-50 text-green-900 border-green-900 hover:bg-green-900 hover:text-white"
              }
            `}
          >
            {p}
          </button>
        )
      )}
    </div>
  );
}
