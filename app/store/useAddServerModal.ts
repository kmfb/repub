// Importing necessary modules  
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ModalState {
    open: boolean;
}

interface ModalActions {
    setOpen: (open: boolean) => void;
}

// Create your store  
const useAddServerModal = create<ModalState & ModalActions>()(
    immer((set) => ({
        open: false,
        setOpen: (open: boolean) =>
            set((state) => {
                state.open = open;
            }),
    }))
);

export default useAddServerModal;  
