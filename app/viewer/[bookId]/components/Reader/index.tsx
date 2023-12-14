import { IBook } from "@/app/interface";
import ePub from "epubjs";
import { useEffect, useRef, useState } from "react";
import { useIsMounted } from "usehooks-ts";
import useRendition from "./hooks/useRendition";
import { useParams } from "next/navigation";
import useBooksContent from "@/app/store/useBooksContent";
import useIndexStore from "@/app/store";
import { repubCache } from "@/app/utils/cache";
import useCachedBookContent from "@/app/hook/useCachedBookContent";
import { EpubViewStyle, ReactReader, ReactReaderStyle } from "react-reader";
import useHookLocationChanged from "../ReaderContainer/hooks/useHookLocationChanged";
import useReader from "../../store";
import _ from "lodash";

function Reader() {
  const params = useParams();
  const { books } = useBooksContent();
  const { books: booksPagination } = useIndexStore();
  const memoryBook: any = books.find((book) => book.id === params.bookId);
  const pBook: any = booksPagination.find((book) => book.id === params.bookId);
  const cachedBook = useCachedBookContent(params.bookId as any);
  const locationChanged = useHookLocationChanged();
  const { setRendition } = useReader();

  // const rendition = useRendition({
  //   book: cachedBook ? cachedBook : memoryBook,
  //   nodeId: "area",
  //   location: pBook?.location,
  // });

  const book = cachedBook ? cachedBook : memoryBook;
  const content = book?.content;

  return (
    <div style={{ height: "100vh" }}>
      <ReactReader
        url={content}
        location={pBook?.location}
        locationChanged={(epubcfi: string) => locationChanged(epubcfi as any)}
        getRendition={(r: any) => {
          setRendition(r);
        }}
        epubViewStyles={{
          ...EpubViewStyle,
          viewHolder: {
            ...EpubViewStyle.viewHolder,
            overflowY: "hidden",
          },
        }}
        readerStyles={{
          ..._.omit(ReactReaderStyle, ["reader"]),
          arrow: {
            display: "none",
          },
          reader: {
            position: "absolute",
            top: 50,
            left: 20,
            bottom: 30,
            right: 20,
          },
        }}
        epubOptions={{
          allowScriptedContent: true,
        }}
      />
    </div>
  );
}
export default Reader;
