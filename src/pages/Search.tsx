import { useSearchParams } from "react-router-dom";
import Select from "../components/Select";
import OutingCardList from "../components/outing/OutingCardList";
import OutingCardListSkeleton from "../components/outing/OutingCardListSkeleton";
import { Pagination } from "../components/Pagination";
import CategorySidebar from "../components/outing/CategorySidebar";
import OutingEditModal from "../components/admin/outing/OutingEditModal";
import ConfirmDialog from "../components/ConfirmDialog";
import { useSearchOutings } from "../hooks/useSearchOutings";
import { useOutingCrud } from "../hooks/useOutingCrud";

function Search() {
  const [searchParams] = useSearchParams();
  const {
    outings,
    rawOutings,
    totalItems,
    hasSearched,
    isLoading,
    error,
    silentRefetch,
    TAKE_PER_PAGE,
  } = useSearchOutings();

  const {
    editingOuting,
    isEditModalOpen,
    deletingOutingId,
    deletingLoading,
    handleEditOuting,
    handleDeleteOuting,
    confirmDelete,
    closeEditModal,
    cancelDelete,
  } = useOutingCrud(rawOutings);

  const title = searchParams.get("title");
  const sortBy = searchParams.get("sortBy");
  const orderBy = searchParams.get("orderBy");

  const handleConfirmDelete = () => confirmDelete(silentRefetch);

  const dataSort = [
    { value: "title", label: "Nome" },
    { value: "city", label: "Cidade" },
  ];
  const dataOrder = [
    { value: "desc", label: "Decrescente" },
    { value: "asc", label: "Crescente" },
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
        onClose={closeEditModal}
        onSuccess={() => silentRefetch()}
      />

      <ConfirmDialog
        isOpen={!!deletingOutingId}
        title="Excluir Passeio"
        message="Tem certeza que deseja excluir este passeio? Esta ação não pode ser desfeita."
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={cancelDelete}
        loading={deletingLoading}
      />
    </div>
  );
}

export default Search;
