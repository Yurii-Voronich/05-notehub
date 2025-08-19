import { useQuery } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import fetchNotes from "../../services/noteService";
import { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalIsOpen, setmodalIsOpen] = useState(false);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", currentPage],
    queryFn: () => fetchNotes(currentPage),
  });

  const openModal = () => {
    setmodalIsOpen(true);
  };
  const closeModal = () => {
    setmodalIsOpen(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />

        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {modalIsOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}

      {isSuccess && data.notes.length > 0 && (
        <NoteList notesData={data.notes} />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
    </div>
  );
};

export default App;
