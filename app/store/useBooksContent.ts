// Importing necessary modules
import { SnackbarProps, SnackbarTypeMap } from "@mui/joy";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { IBook } from "../interface";
import { IFile } from "../components/FileList";
import { persist, createJSONStorage } from "zustand/middleware";
interface IndexState {
  books: Array<IBook>;
}

interface IndexActions {
  addBook: (book: IBook) => void;
  setBooks: (books: IBook[]) => void;
}

// Create your store
const useBooksContent = create<IndexState & IndexActions>()(
  immer((set) => ({
    books: [],
    addBook: (book: IBook) =>
      set((state) => {
        const hasBook = state.books.find((b) => b.id === book.id);
        if (hasBook) {
          return;
        }
        state.books.push(book);
      }),
    setBooks: (books: IBook[]) =>
      set((state) => {
        state.books = books;
      }),
  }))
);

export default useBooksContent;
