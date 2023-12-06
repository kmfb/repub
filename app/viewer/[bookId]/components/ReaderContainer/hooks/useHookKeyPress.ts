import { useCallback, useEffect } from "react";
import useReader from "../../../store";

function useHookKeyPress() {
  const { rendition } = useReader();
  const movePage = useCallback(
    (type: "PREV" | "NEXT") => {
      if (!rendition) return;
      if (type === "PREV") rendition.prev();
      else rendition.next();
    },
    [rendition]
  );
  const handleKeyPress = useCallback(
    ({ key }: any) => {
      key && key === "ArrowLeft" && movePage("PREV");
      key && key === "ArrowRight" && movePage("NEXT");
    },
    [movePage]
  );

  useEffect(() => {
    if (!rendition) return;

    document.addEventListener("keyup", handleKeyPress, false);

    rendition.on("keyup", handleKeyPress);

    return () => {
      document.removeEventListener("keyup", handleKeyPress, false);
      rendition.off("keyup", handleKeyPress);
    };
  }, [rendition, handleKeyPress]);
}
export default useHookKeyPress;
