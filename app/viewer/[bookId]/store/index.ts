// Importing necessary modules
import { SnackbarProps, SnackbarTypeMap } from "@mui/joy";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { persist, createJSONStorage } from "zustand/middleware";
import Rendition from "epubjs/types/rendition";
interface IndexState {
  rendition: Rendition;
}

interface IndexActions {
  setRendition: (rendition: Rendition) => void;
}

// Create your store
const useReader = create<IndexState & IndexActions>()(
  immer((set) => ({
    rendition: null as any,
    setRendition: (rendition: Rendition) =>
      set((state) => {
        state.rendition = rendition;
      }),
  }))
);

export default useReader;
