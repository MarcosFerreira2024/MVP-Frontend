import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Select from "../components/Select";
import OutingCardList from "../components/outing/OutingCardList";
import { Pagination } from "../components/Pagination";
import CategorySidebar from "../components/outing/CategorySidebar";
import { useOutings } from "../hooks/useOutings";
import type { OutingCardProps } from "../components/outing/OutingCard";
import type { OutingResponse } from "../hooks/useOuting";

const TAKE_PER_PAGE = 12;

const transformOutingResponseToOutingCardProps = (
  outing: OutingResponse
): OutingCardProps => {
  const totalRating = outing.ratings.reduce((sum, r) => sum + r.rating, 0);
  const rating =
    outing.ratings.length > 0
      ? (totalRating / outing.ratings.length).toFixed(1)
      : "0.0";
  const ratingCount = outing.ratings.length;

  return {
    rating: rating,
    ratingCount: ratingCount,
    title: outing.title,
    description: outing.content,
    price: outing.price.toFixed(2).replace(".", ","),
    to: `/outing/${outing.slug}`,
    images: outing.photos.map((photo) => photo.url),
  };
};

function Search() {
  const [searchParams] = useSearchParams();
  const { getOutings, isLoading, error: contextError } = useOutings();

  const title = searchParams.get("title");
  const sortBy = searchParams.get("sortBy");
  const orderBy = searchParams.get("orderBy");
  const page = searchParams.get("page");
  const category = searchParams.get("category");
  const currentPage = parseInt(page || "1");

  const [outings, setOutings] = useState<OutingCardProps[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const error = contextError;

  useEffect(() => {
    const fetchSearchOutings = async () => {
      try {
        const data = await getOutings(TAKE_PER_PAGE, currentPage, {
          sortBy: sortBy ?? undefined,
          orderBy: orderBy ?? undefined,
          title: title ?? undefined,
          category: category === "all" ? undefined : category ?? undefined,
        });
        if (data && Array.isArray(data.outings) && typeof data.totalItems === "number") {
          const transformedOutings = data.outings.map(transformOutingResponseToOutingCardProps);
          setOutings(transformedOutings);
          setTotalItems(data.totalItems);
        } else if (data && typeof data.totalItems === "number") {
            // Case where outings might be empty but totalItems is valid
            setOutings([]);
            setTotalItems(data.totalItems);
        }
         else {
          // Fallback if data structure is unexpected
          setOutings([]);
          setTotalItems(0);
        }
      } catch (err: any) {
        console.error(err);
        setOutings([]);
        setTotalItems(0);
      }
    };

    fetchSearchOutings();
  }, [page, sortBy, orderBy, title, category, currentPage, getOutings]);

  const dataSort = [
    {
      value: "title",
      label: "Nome",
    },
    {
      value: "city",
      label: "Cidade",
    },
  ];
  const dataOrder = [
    {
      value: "desc",
      label: "Decrescente",
    },
    {
      value: "asc",
      label: "Crescente",
    },
  ];

  return (
    <div>
      <Header />

      <div className="px-4 flex flex-col gap-10">
        <div className="flex justify-between pr-4">
          <h1 className="text-main text-4xl ">
            Mostrando resultados para: ”{title || "Todos"}”
          </h1>

          <div className="flex gap-4">
            <Select
              queryKey="sortBy"
              containerIcon="/chevrons-up-down.svg"
              initialValue={sortBy ?? "title"}
              data={dataSort}
            />
            <Select
              queryKey="orderBy"
              containerIcon="/chevrons-up-down.svg"
              initialValue={orderBy ?? "Desc"}
              data={dataOrder}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <CategorySidebar />

          <div className="flex-1 grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-4">
            {isLoading && <p>Carregando...</p>}{" "}
            {/* You might want a better loading indicator */}
            {error && (
              <p className="text-red-500 text-nowrap">
                Ocorreu um erro: {error}
              </p>
            )}
            {!isLoading && !error && outings.length === 0 && (
              <p className="text-main text-nowrap">
                Não encontramos nenhum resultado para essa pesquisa
              </p>
            )}
            {!isLoading && !error && outings.length > 0 && (
              <>
                <OutingCardList data={outings} />

                <div className="col-span-full flex justify-center items-center h-full">
                  <Pagination take={TAKE_PER_PAGE} totalItems={totalItems} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
