import { IBook } from "@/app/interface";
import ePub from "epubjs";
import { useEffect, useRef } from "react";
import { useIsMounted } from "usehooks-ts";
import useRendition from "./hooks/useRendition";
import { useParams } from "next/navigation";
import useBooksContent from "@/app/store/useBooksContent";
import useIndexStore from "@/app/store";

interface Props {}

function Reader({}: Props) {
  const params = useParams();
  const { books } = useBooksContent();
  const { books: booksPagination } = useIndexStore();
  const cBook: any = books.find((book) => book.id === params.bookId);
  const pBook: any = booksPagination.find((book) => book.id === params.bookId);

  const rendition = useRendition({
    book: cBook,
    nodeId: "area",
    location: pBook?.location,
  });

  return (
    <div>
      <div
        id="area"
        className="box-border mx-auto w-full h-full overflow-y-hidden"
      ></div>
    </div>
  );
}
export default Reader;
