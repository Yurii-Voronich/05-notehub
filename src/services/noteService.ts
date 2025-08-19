import axios from "axios";
import type { Note } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${
  import.meta.env.VITE_NOTEHUB_TOKEN
}`;
interface NoteResp {
  notes: Note[];
  totalPages: number;
}

export default async function fetchNotes(page: number): Promise<NoteResp> {
  const res = await axios.get<NoteResp>("/notes", {
    params: {
      page: page,
      perPage: 12,
    },
  });
  return res.data;
}
export interface NewNote {
  title: string;
  content: string;
  tag: string;
}
export async function createNote(newNoteData: NewNote) {
  await axios.post<NewNote>("/notes", newNoteData);
}

export async function deleteNote(id: string) {
  await axios.delete(`/notes/${id}`);
}
