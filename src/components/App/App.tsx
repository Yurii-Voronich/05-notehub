import { useQuery } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import fetchNotes from "../../services/noteService";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", currentPage],
    queryFn: () => fetchNotes(currentPage),
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        {isSuccess && data.totalPages > 1 && (
          <ReactPaginate
            pageCount={data.totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setCurrentPage(selected + 1)}
            forcePage={currentPage - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
          />
        )}
        <button className={css.button}>Create note +</button>
      </header>
      {isSuccess && data.notes.length > 0 && (
        <NoteList notesData={data.notes} />
      )}
    </div>
  );
};

export default App;
