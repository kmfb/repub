import { IBook } from "@/app/interface";
import ePub from "epubjs";
import { useEffect, useRef, useState } from "react";
import useReader from "../../../store";
import { ILocation } from "../../../types";

function useRendition({
  book,
  nodeId,
  location,
}: {
  book: IBook;
  nodeId: string;
  location: ILocation;
}) {
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
      debugger;
      const r: any = await rendition.display(
        location ? location.start : undefined
      );

      setRendition(rendition);
    };

    render();

    displayed.current = true;
  }, [location]);
  return rendition;
}
export default useRendition;
