"use client";

import useIndexStore from "@/app/store";
import { useEffect, useRef, useState } from "react";
import { EpubViewer, ReactEpubViewer } from "react-epub-viewer";
import "regenerator-runtime";
import { Book } from "epubjs";
import useServerViewerStore from "@/app/store/useServerViewerStore";
import queryString from "query-string";
import { repubCache } from "@/app/utils/cache";
import Reader from "./components/Reader";
import useBooksContent from "@/app/store/useBooksContent";

function Page({ params }: { params: { bookId: string } }) {
  const { books } = useBooksContent();
  const { books: booksPagination } = useIndexStore();
  const cBook: any = books.find((book) => book.id === params.bookId);
  const pBook: any = booksPagination.find((book) => book.id === params.bookId);
  return (
    <div style={{ position: "relative", height: "100%" }}>
      <Reader book={cBook} bookPagination={pBook} />
    </div>
  );
}


export default Page;
