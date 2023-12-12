// Importing necessary modules  
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { IServerFormData } from "../interface";

interface ModalState {
  open: boolean;
  currentEditServer: IServerFormData;
}

interface ModalActions {
  setOpen: (open: boolean) => void;
  setCurrentEditServer: (server: IServerFormData) => void;
}

// Create your store
const useAddServerModal = create<ModalState & ModalActions>()(
  immer((set) => ({
    open: false,
    currentEditServer: {} as any,
    setOpen: (open: boolean) =>
      set((state) => {
        state.open = open;
      }),
    setCurrentEditServer: (server: IServerFormData) =>
      set((state) => {
        state.currentEditServer = server;
      }),
  }))
);

export default useAddServerModal;  
