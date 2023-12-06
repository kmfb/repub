import useBooksContent from "@/app/store/useBooksContent";
import Reader from "../Reader";
import useIndexStore from "@/app/store";
import { useParams } from "next/navigation";
import useRendition from "../Reader/hooks/useRendition";
import useReader from "../../store";
import { useCallback, useEffect } from "react";
import useHookKeyPress from "./hooks/useHookKeyPress";

function ReaderContainer() {
  useHookKeyPress();
  return (
    <div>
      <Reader></Reader>
    </div>
  );
}
export default ReaderContainer;
