import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "../components/Select";
import OutingCardList from "../components/outing/OutingCardList";
import OutingCardListSkeleton from "../components/outing/OutingCardListSkeleton";
import { Pagination } from "../components/Pagination";
import CategorySidebar from "../components/outing/CategorySidebar";
import { useOutings } from "../hooks/useOutings";
import OutingEditModal from "../components/admin/outing/OutingEditModal";
import ConfirmDialog from "../components/ConfirmDialog";
import { deleteOuting } from "../actions/deleteOuting";
import type { OutingCardProps } from "../components/outing/OutingCard";
import type { OutingResponse } from "../types/Outing";
import toast from "react-hot-toast";

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
  const [rawOutings, setRawOutings] = useState<OutingResponse[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const error = contextError;

  const [editingOuting, setEditingOuting] = useState<OutingResponse | null>(
    null,
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingOutingId, setDeletingOutingId] = useState<string | null>(null);
  const [deletingLoading, setDeletingLoading] = useState(false);

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
        const transformedOutings = data.outings.map(
          transformOutingResponseToOutingCardProps,
        );
        setOutings(transformedOutings);
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
      const res = await fetch(`http://localhost:3333/outing?${params}`);
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

  const handleEditOuting = (id: string) => {
    const outing = rawOutings.find((o) => o.id === id);
    if (outing) {
      setEditingOuting(outing);
      setIsEditModalOpen(true);
    }
  };

  const handleDeleteOuting = (id: string) => {
    setDeletingOutingId(id);
  };

  const confirmDelete = async () => {
    if (!deletingOutingId) return;
    setDeletingLoading(true);
    try {
      await deleteOuting(deletingOutingId);
      toast.success("Passeio excluído com sucesso!");
      setDeletingOutingId(null);
      silentRefetch();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao excluir passeio.",
      );
    } finally {
      setDeletingLoading(false);
    }
  };

  const handleEditSuccess = () => {
    silentRefetch();
  };

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
      <div className="px-4 flex flex-col gap-6 md:gap-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-2 pr-4">
          <h1 className="text-main text-xl text-nowrap md:text-4xl ">
            Mostrando resultados para: ”{title || "Todos"}”
          </h1>

          <div className="flex gap-4 flex-wrap md:flex-nowrap self-center md:self-auto">
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

        <div className="flex flex-col md:flex-row gap-4">
          <CategorySidebar />

          <div className="flex-1 grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-4">
            {isLoading && <OutingCardListSkeleton />}
            {error && (
              <p className="text-red-500 text-nowrap">
                Ocorreu um erro: {error}
              </p>
            )}
            {hasSearched && !isLoading && !error && outings.length === 0 && (
              <p className="text-main ">
                Não encontramos nenhum resultado para essa pesquisa
              </p>
            )}
            {!isLoading && !error && outings.length > 0 && (
              <>
                <OutingCardList
                  data={outings}
                  onEdit={handleEditOuting}
                  onDelete={handleDeleteOuting}
                />

                <div className="col-span-full flex justify-center items-center h-full">
                  <Pagination take={TAKE_PER_PAGE} totalItems={totalItems} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <OutingEditModal
        isOpen={isEditModalOpen}
        outing={editingOuting}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingOuting(null);
        }}
        onSuccess={handleEditSuccess}
      />

      <ConfirmDialog
        isOpen={!!deletingOutingId}
        title="Excluir Passeio"
        message="Tem certeza que deseja excluir este passeio? Esta ação não pode ser desfeita."
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        onConfirm={confirmDelete}
        onCancel={() => setDeletingOutingId(null)}
        loading={deletingLoading}
      />
    </div>
  );
}

export default Search;
