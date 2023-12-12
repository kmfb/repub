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
  removeServerConfig: (id: string) => void;
  updateServerConfig: (config: IServerFormData, id: string) => void;
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
      removeServerConfig: (id: string) =>
        set((state) => {
          const index = state.servers.findIndex((s) => s.id === id);
          debugger;
          if (index === -1) {
            return;
          }
          state.servers.splice(index, 1);
        }),
      updateServerConfig: (config: IServerFormData, id: string) =>
        set((state) => {
          const index = state.servers.findIndex((s) => s.id === id);
          if (index === -1) {
            return;
          }
          state.servers[index] = config;
        }),
    })),
    {
      name: "serverViewerStore",
    }
  )
);

export default useServerViewerStore;  
