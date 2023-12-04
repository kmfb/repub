// Importing necessary modules
import { SnackbarProps, SnackbarTypeMap } from "@mui/joy";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { IBook } from "../interface";
import { IFile } from "../components/FileList";

interface IndexState {
  books: Array<IBook>;
  currentPath: Array<string>;
  fileLists: IFile[];
}

interface IndexActions {
  addBook: (book: IBook) => void;
  setBooks: (books: IBook[]) => void;
  pushPath: (path: string) => void;
  popPath: () => void;
  setFileLists: (fileLists: IFile[]) => void;
}

// Create your store
const useIndexStore = create<IndexState & IndexActions>()(
  immer((set) => ({
    books: [],
    currentPath: [],
    fileLists: [],
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
    pushPath: (path: string) =>
      set((state) => {
        state.currentPath.push(path);
      }),
    popPath: () =>
      set((state) => {
        state.currentPath.pop();
      }),

    setFileLists: (fileLists: IFile[]) =>
      set((state) => {
        state.fileLists = fileLists;
      }),
  }))
);

export default useIndexStore;
