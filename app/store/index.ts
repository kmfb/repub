// Importing necessary modules
import { SnackbarProps, SnackbarTypeMap } from "@mui/joy";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { IBook } from "../interface";

interface IndexState {
  books: Array<IBook>;
}

interface IndexActions {
  addBook: (book: IBook) => void;
}

// Create your store
const useIndexStore = create<IndexState & IndexActions>()(
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
  }))
);

export default useIndexStore;
