import useIndexStore from "@/app/store";
import { useParams } from "next/navigation";
import useReader from "../../../store";
import { useCallback, useEffect } from "react";
import { ILocation } from "../../../types";
import { syncStateToWebdav } from "@/app/clientApi";

function useHookLocationChanged() {
  const { books, setBooks, currentServer } = useIndexStore();

  const params = useParams();

  const locationChanged = (location: string) => {
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
    syncStateToWebdav(currentServer, booksWithLocation);
  };

  return locationChanged;
}
export default useHookLocationChanged;
