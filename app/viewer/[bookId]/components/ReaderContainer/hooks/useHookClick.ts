import { useEffect } from "react";
import useReader from "../../../store";

function useHookClick() {
  const { rendition } = useReader();
  useEffect(() => {
    if (!rendition) return;
    const handleClick = (event: any) => {
      const width = event.view.document.body.clientWidth;
      const offsetX = event.clientX % width;

      const half = width / 2;
      console.log(event);
      if (offsetX < half) {
        rendition.prev();
        console.log("prev");
      } else {
        rendition.next();
        console.log("next");
      }
    };

    rendition.on("click", handleClick);

    return () => {
      rendition.off("click", handleClick);
    };
  }, [rendition]);
}
export default useHookClick;
