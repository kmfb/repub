// Importing necessary modules
import { SnackbarProps, SnackbarTypeMap } from "@mui/joy";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface IndexState {
  snackbar: {
    value: SnackbarTypeMap["props"];
    setValue: (value: SnackbarTypeMap["props"]) => void;
  };
}

// Create your store
const useIndexStore = create<IndexState>()(
  immer((set) => ({
    snackbar: {
      value: {
        open: false,
        message: "",
        color: "success",
      },
      setValue: (value) =>
        set((state: any) => {
          state.snackbar.value = value;
        }),
    },
  }))
);

export default useIndexStore;
