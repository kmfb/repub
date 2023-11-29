"use client";

import useIndexStore from "@/app/store";
import { useEffect, useRef, useState } from "react";
import { EpubViewer, ReactEpubViewer } from "react-epub-viewer";
import "regenerator-runtime";
import { Book } from "epubjs";
import useServerViewerStore from "@/app/store/useServerViewerStore";
import queryString from "query-string";
function Page({ params }: { params: { bookId: string } }) {
  const indexStore = useIndexStore();
  const { servers } = useServerViewerStore();

  const book = indexStore.books.find((book) => book.id === params.bookId);
  const server = servers.find((server) => server.id === book?.serverId);
  console.log(book, "im book");
  const viewerRef = useRef(null);
  const [url, setUrl] = useState<any>(null);
  const query = {
    path: book?.name,
    ...server,
  };
  const queryStr = queryString.stringify(query);
  return (
    <div style={{ position: "relative", height: "100%" }}>
      <ReactEpubViewer
        url={`http://localhost:3000/api/book?${queryStr}`}
        ref={viewerRef}
      />
    </div>
  );
}

async function convertToBuffer(epubContent: any): Promise<any> {
  if (!epubContent) {
    return Promise.resolve(null);
  }
  const blob = new Blob([epubContent], { type: "application/epub+zip" });

  return new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const arrayBuffer: ArrayBuffer | null = reader.result as ArrayBuffer;
      if (arrayBuffer) {
        resolve(arrayBuffer);
      } else {
        reject(new Error("Failed to convert EPUB content to ArrayBuffer"));
      }
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsArrayBuffer(blob);
  });
}
export default Page;
