import { IBook } from "@/app/interface";
import ePub from "epubjs";
import { useEffect, useRef, useState } from "react";
import useReader from "../../../store";

function useRendition({ book, nodeId }: { book: IBook; nodeId: string }) {
  const displayed = useRef(false);
  const { rendition, setRendition } = useReader();
  useEffect(() => {
    if (displayed.current) {
      return () => {};
    }
    const render = async () => {
      var eBook = ePub(book.content);
      var rendition = eBook.renderTo(nodeId, {
        width: 600,
        height: 400,
        flow: "paginated",
      });

      const r: any = await rendition.display();
      setRendition(rendition);
    };

    render();

    displayed.current = true;
  }, []);
  return rendition;
}
export default useRendition;
