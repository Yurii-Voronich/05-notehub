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
    },
  });
  return res.data;
}
