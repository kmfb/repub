import { useQuery } from "@tanstack/react-query";
import useSearchParamsUtil from "../useSearchParamsUtil";
import { getFile } from "@/app/clientApi";
import { useEffect } from "react";
import { blobToJson } from "@/app/utils";
import useIndexStore from "@/app/store";
import _ from "lodash";

function useSyncPagination() {
  const { setCurrentServer, setBooks } = useIndexStore();
  const {
    getQueryValueByKey,
    createQueryString,
    createQueryStringFromObj,
    push,
  } = useSearchParamsUtil();
  const currentServer = getQueryValueByKey("currentServer");
  const { data: booksPaginationRes, isLoading: isBPLoading } = useQuery({
    queryKey: ["booksPagination", currentServer],
    queryFn: () =>
      getFile(
        {
          filename: "/.repub/index-storage.json",
        } as any,
        currentServer
      ),
    enabled: !!currentServer,
  });

  useEffect(() => {
    debugger;

    const getRes = async () => {
      if (!(booksPaginationRes?.data instanceof Blob)) {
        return;
      }
      const res: any = await blobToJson(booksPaginationRes?.data);

      if (!res) {
        return;
      }
      setBooks(res.books);
    };
    getRes();
  }, [booksPaginationRes]);
}
export default useSyncPagination;
