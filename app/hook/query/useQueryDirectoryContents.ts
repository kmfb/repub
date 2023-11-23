import { getDirectoryContents } from "@/app/clientApi";
import { IServerFormData } from "@/app/interface";
import { useMutation, useQuery } from "@tanstack/react-query";

function useQueryDirectoryContents() {
  const query = useMutation({
    mutationKey: ["directoryContents"],
    mutationFn: ({ path, server }: { path: string; server: IServerFormData }) =>
      getDirectoryContents(path, server),
  });
  return query;
}
export default useQueryDirectoryContents;
