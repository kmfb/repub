import { getDirectoryContents } from "@/app/clientApi";
import { IServerFormData } from "@/app/interface";
import useIndexStore from "@/app/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import queryString from "query-string";

function useQueryDirectoryContents() {
  const { pushPath, setFileLists } = useIndexStore();
  const router = useRouter();
  const query = useMutation({
    mutationKey: ["directoryContents"],
    mutationFn: ({ path, server }: { path: string; server: IServerFormData }) =>
      getDirectoryContents(path, server),
    onSuccess: (res, variables) => {
      const prevQuery = queryString.parse(window.location.search);
      const { currentPath } = prevQuery;
      const cpPrev = currentPath ? JSON.parse(currentPath as string) : [];
      const cp = [...cpPrev, variables.path];
      const qs = queryString.stringify({
        currentServer: JSON.stringify(variables.server),
        currentPath: JSON.stringify(cp),
      });

      router.push(`/?${qs}`);
    },
  });
  return query;
}
export default useQueryDirectoryContents;
