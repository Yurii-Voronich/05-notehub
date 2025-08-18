import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
interface NoteListProps {
  notesData: Note[];
}

function NoteList({ notesData }: NoteListProps) {
  return (
    <div>
      <ul className={css.list}>
        {notesData.map((note) => (
          <li className={css.listItem} key={note.id}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <button className={css.button}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
