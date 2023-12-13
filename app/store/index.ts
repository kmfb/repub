// Importing necessary modules
import { SnackbarProps, SnackbarTypeMap } from "@mui/joy";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { IBook, IServerFormData } from "../interface";
import { IFile } from "../components/FileList";
import { persist, createJSONStorage } from "zustand/middleware";
import { getClientConfigFromServer, getClientConfigFromUrl } from "../utils";
import queryString from "query-string";
import _ from "lodash";
import { createClient } from "webdav";


import axios from "../lib/axios";
interface IndexState {
  books: Array<IBook>;
  currentPath: Array<string>;
  currentServer: IServerFormData;
  fileLists: IFile[];
}

interface IndexActions {
  addBook: (book: IBook) => void;
  setBooks: (books: IBook[]) => void;
  pushPath: (path: string) => void;
  popPath: () => void;
  setFileLists: (fileLists: IFile[]) => void;
  setCurrentServer: (server: IServerFormData) => void;
}

// Create your store
const useIndexStore = create<IndexState & IndexActions>()(
  persist(
    immer((set) => ({
      books: [],
      currentPath: [],
      currentServer: {} as any,
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
      setCurrentServer: (server: IServerFormData) =>
        set((state) => {
          state.currentServer = server;
        }),
    })),
    {
      name: "index-storage", // name of the item in the storage (must be unique)
      partialize: (state) => {
        // const syncStateToWebdav = async () => {
        //   const currentServer = state.currentServer;
        //   if (_.isEmpty(currentServer)) {
        //     return;
        //   }
        //   const isEmptyLocal = _.isEmpty(state.books);
        //   if (isEmptyLocal) {
        //     return;
        //   }

        //   const res = await axios.post(
        //     `/webdav/putFileContents?${queryString.stringify(currentServer)}`,
        //     _.pick(state, ["books", "currentServer"])
        //   );
        // };
        // syncStateToWebdav();
        return state;
      },
    }
  )
);




export default useIndexStore;
