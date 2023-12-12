import { getDirectoryContents } from "@/app/clientApi";
import { useQuery } from "@tanstack/react-query";
import useSearchParamsUtil from "../useSearchParamsUtil";
import _ from "lodash";

function useQueryFileList() {
  const { getQueryValueByKey } = useSearchParamsUtil();
  const currentServer = getQueryValueByKey("currentServer");
  const currentPath = getQueryValueByKey("currentPath");
  const { data: fileListsRes, isLoading } = useQuery({
    queryKey: ["fileLists", currentPath],
    queryFn: () =>
      getDirectoryContents(currentPath[currentPath.length - 1], currentServer),
    enabled: !!currentPath && !_.isEmpty(currentServer),
    retry(failureCount, error) {
      if (failureCount >= 2) {
        return false;
      }
      return true;
    },
  });

  const fileList = _.get(fileListsRes, "data.data");
  return {
    fileList,
    isLoading,
  };
}
export default useQueryFileList;
