import { useQuery } from "@tanstack/react-query";
import useSearchParamsUtil from "../useSearchParamsUtil";
import { getDirectoryContents, getFile } from "@/app/clientApi";
import { useEffect } from "react";
import { blobToJson, getBasePathFromHost, getConfigPath } from "@/app/utils";
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
  const [_host, basePath] = getBasePathFromHost(currentServer?.host);
  const isCurrentServerExist = !_.isEmpty(currentServer);

  const { data: syncFileExistRes } = useQuery({
    queryKey: ["storageExist", currentServer],
    queryFn: () => getDirectoryContents(basePath, currentServer),
    enabled: isCurrentServerExist,
  });

  const hasSyncFile = () => {
    const data = _.get(syncFileExistRes, "data.data", []);
    const hasSyncFile = data.find((item: any) => item.basename === "repub");
    const res = !!hasSyncFile;
    return res;
  };

  

  const { data: booksPaginationRes, isLoading: isBPLoading } = useQuery({
    queryKey: ["booksPagination", currentServer],
    queryFn: () =>
      getFile(
        {
          filename: getConfigPath(currentServer, "index-storage.json"),
        } as any,
        currentServer
      ),
    enabled: isCurrentServerExist && hasSyncFile(),
  });

  useEffect(() => {
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
