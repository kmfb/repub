import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createStore } from "zustand/vanilla";

const store = createStore(
  persist(
    immer((set) => ({
      books: {},
      setBooks: (bookId: string, value: any) =>
        set((state: any) => {
          state.books[bookId] = value;
        }),
    })),
    {
      name: "download-progress-storage",
    }
  )
);
const { getState, setState, subscribe } = store;

export default store;
