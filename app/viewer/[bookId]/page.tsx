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

function Page({ params }: { params: { bookId: string } }) {
  const { books } = useIndexStore();
  const cBook: any = books.find((book) => book.id === params.bookId);

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <Reader book={cBook} />
    </div>
  );
}


export default Page;
