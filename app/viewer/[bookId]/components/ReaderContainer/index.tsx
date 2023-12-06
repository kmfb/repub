import useBooksContent from "@/app/store/useBooksContent";
import Reader from "../Reader";
import useIndexStore from "@/app/store";
import { useParams } from "next/navigation";
import useRendition from "../Reader/hooks/useRendition";
import useReader from "../../store";
import { useCallback, useEffect } from "react";
import useHookKeyPress from "./hooks/useHookKeyPress";
import { ILocation } from "../../types";

function ReaderContainer() {
  useHookKeyPress();
  const { books, setBooks } = useIndexStore();
  const params = useParams();
  const { rendition } = useReader();

  const locationChanged = useCallback(
    (location: ILocation) => {
      debugger;
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
  return (
    <div>
      <Reader></Reader>
    </div>
  );
}
export default ReaderContainer;
