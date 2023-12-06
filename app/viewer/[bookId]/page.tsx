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
import ReaderContainer from "./components/ReaderContainer";

function Page({ params }: { params: { bookId: string } }) {
  return (
    <div style={{ position: "relative", height: "100%" }}>
      <ReaderContainer />
    </div>
  );
}


export default Page;
