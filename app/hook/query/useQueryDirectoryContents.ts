import { getDirectoryContents } from "@/app/clientApi";
import { IServerFormData } from "@/app/interface";
import useIndexStore from "@/app/store";
import { useMutation, useQuery } from "@tanstack/react-query";

function useQueryDirectoryContents() {
  const { pushPath, setFileLists } = useIndexStore();
  const query = useMutation({
    mutationKey: ["directoryContents"],
    mutationFn: ({ path, server }: { path: string; server: IServerFormData }) =>
      getDirectoryContents(path, server),
    onSuccess: (res, variables) => {
      pushPath(variables.path);
      setFileLists(res.data.data);
    },
  });
  return query;
}
export default useQueryDirectoryContents;
