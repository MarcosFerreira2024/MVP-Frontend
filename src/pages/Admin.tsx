import React, { useState } from "react";
import Header from "../components/Header";
import useModal from "../hooks/useModal";
import { OutingCreationModal } from "../components/admin/outing/OutingCreationModal";
import Button from "../components/Button";

function Admin() {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <Button size="sm" onClick={openModal}>
          Criar Passeio
        </Button>

        <OutingCreationModal closeModal={closeModal} isOpen={isModalOpen} />
      </div>
    </>
  );
}

export default Admin;
