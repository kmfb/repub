import useIndexStore from "@/app/store";
import { useParams } from "next/navigation";
import useReader from "../../../store";
import { useCallback, useEffect } from "react";
import { ILocation } from "../../../types";

function useHookLocationChanged() {
  const { books, setBooks } = useIndexStore();
  const params = useParams();
  const { rendition } = useReader();

  const locationChanged = useCallback(
    (location: ILocation) => {
   
      const booksWithLocation = books.map((book) => {
        if (book.id === params.bookId) {
          return {
            ...book,
            location,
          };
        }
        return book;
      });
      setBooks(booksWithLocation);
    },
    [rendition]
  );

  useEffect(() => {
    if (!rendition) {
      return () => {};
    }
    rendition.on("locationChanged", locationChanged);
    return () => {
      rendition.off("locationChanged", locationChanged);
    };
  }, [rendition, locationChanged]);
}
export default useHookLocationChanged;
