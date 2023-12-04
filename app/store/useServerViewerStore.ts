// Importing necessary modules  
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { IServerFormData } from "../interface";
import { persist, createJSONStorage } from "zustand/middleware";
// Define your store states
interface ServerState {
  servers: IServerFormData[];
}

interface ServerActions {
  addServerConfig: (config: IServerFormData) => void;
  removeServerConfig: (host: string) => void;
}

// Create your store
const useServerViewerStore = create<ServerState & ServerActions>()(
  persist(
    immer((set) => ({
      servers: [],

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
    })),
    {
      name: "serverViewerStore",
    }
  )
);

export default useServerViewerStore;  
