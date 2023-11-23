// Importing necessary modules  
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { IServerFormData } from "../interface";
import { persist, createJSONStorage } from "zustand/middleware";
// Define your store states
interface ServerState {
  servers: IServerFormData[];
  books: any[];
}

interface ServerActions {
  addServerConfig: (config: IServerFormData) => void;
  removeServerConfig: (host: string) => void;
  setBooks: (books: any[]) => void;
}

// Create your store
const useServerViewerStore = create<ServerState & ServerActions>()(
  persist(
    immer((set) => ({
      servers: [],
      books: [],
      addServerConfig: (config: IServerFormData) =>
        set((state) => {
          state.servers.push(config);
        }),
      removeServerConfig: (host: string) =>
        set((state) => {
          state.servers = state.servers.filter(
            (server) => server.host !== host
          );
        }),
      setBooks: (books: any[]) =>
        set((state) => {
          state.books = books;
        }),
    })),
    {
      name: "serverViewerStore",
    }
  )
);

export default useServerViewerStore;  
