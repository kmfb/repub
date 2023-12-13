import { useEffect } from "react";
import useReader from "../../../store";

function useHookClick() {
  const { rendition } = useReader();
  useEffect(() => {
    if (!rendition) return;
    const handleClick = (event: any) => {
      const selection = event.view.document.getSelection();
      const str = selection.toString();
      if (selection && str) {
        // selection exists and has content
        return;
      }
      const width = event.view.document.body.clientWidth;
      const offsetX = event.clientX % width;

      const half = width / 2;
   
      if (offsetX < half) {
        rendition.prev();
      } else {
        rendition.next();
      }
    };

    rendition.on("click", handleClick);

    return () => {
      rendition.off("click", handleClick);
    };
  }, [rendition]);
}
export default useHookClick;
