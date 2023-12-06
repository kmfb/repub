import useBooksContent from "@/app/store/useBooksContent";
import Reader from "../Reader";
import useIndexStore from "@/app/store";
import { useParams } from "next/navigation";
import useRendition from "../Reader/hooks/useRendition";
import useReader from "../../store";
import { useCallback, useEffect } from "react";
import useHookKeyPress from "./hooks/useHookKeyPress";
import { ILocation } from "../../types";
import useHookLocationChanged from "./hooks/useHookLocationChanged";
import useHookClick from "./hooks/useHookClick";

function ReaderContainer() {
  useHookKeyPress();
  useHookLocationChanged();
  useHookClick();
  return (
    <div>
      <Reader></Reader>
    </div>
  );
}
export default ReaderContainer;
