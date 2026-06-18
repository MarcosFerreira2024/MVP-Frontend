import useModal from "../hooks/useModal";
import { OutingCreationModal } from "../components/admin/outing/OutingCreationModal";
import Button from "../components/Button";

function Admin() {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div className="container mx-auto p-4 flex gap-4">
        <Button size="sm" onClick={openModal}>
          Criar Passeio
        </Button>

        <a href="http://localhost:3333/api/docs" target="_blank" rel="noopener noreferrer">
          <Button size="sm">API Scalar</Button>
        </a>

        <OutingCreationModal closeModal={closeModal} isOpen={isModalOpen} />
      </div>
    </>
  );
}

export default Admin;
