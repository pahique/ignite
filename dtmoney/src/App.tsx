import { GlobalStyle } from "./styles/global";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { useState } from "react";
import Modal from 'react-modal';

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
      setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
      setIsNewTransactionModalOpen(false);
  }

  return (
    <>
      <Header onOpenNewTransaction={handleOpenNewTransactionModal}/>
      <Dashboard/>

      <Modal isOpen={isNewTransactionModalOpen}
          onRequestClose={handleCloseNewTransactionModal}>
        <h2>Cadastrar nova transação</h2>
      </Modal>

      <GlobalStyle/>
    </>
  );
}
