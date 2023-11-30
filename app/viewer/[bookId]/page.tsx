"use client";

import useIndexStore from "@/app/store";
import { useEffect, useRef, useState } from "react";
import { EpubViewer, ReactEpubViewer } from "react-epub-viewer";
import "regenerator-runtime";
import { Book } from "epubjs";
import useServerViewerStore from "@/app/store/useServerViewerStore";
import queryString from "query-string";
import { repubCache } from "@/app/utils/cache";

function Page({ params }: { params: { bookId: string } }) {
  const viewerRef = useRef(null);
  const [book, setBook] = useState<any>(null);
  const [toggle, setToggle] = useState(false);

  const { books } = useIndexStore();
  const cBook = books.find((book) => book.id === params.bookId);

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <ReactEpubViewer url={cBook?.content as any} ref={viewerRef} />
    </div>
  );
}


export default Page;
