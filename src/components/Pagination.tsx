import { usePagination } from "../hooks/usePagination";

type Props = {
  totalItems: number;
  take: number;
};

export function Pagination({ totalItems, take }: Props) {
  const { page, pages, goToPage } = usePagination(totalItems, take);

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
