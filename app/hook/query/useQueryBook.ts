import { getDirectoryContents, getFile } from "@/app/clientApi";
import { IFile } from "@/app/components/FileList";
import { IServerFormData } from "@/app/interface";
import useIndexStore from "@/app/store";
import { getBookId } from "@/app/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

function useQueryBook() {
  const { addBook } = useIndexStore();
  const router = useRouter();
  const query = useMutation({
    mutationKey: ["useQueryBook"],
    mutationFn: ({ file, server }: { file: IFile; server: IServerFormData }) =>
      getFile(file, server),
    onSuccess: (res, variables) => {
      console.log(res, "im use");
      const bookId = getBookId(variables.file, variables.server);

      addBook({
        id: bookId,
        name: variables.file.filename,
        progress: 0,
        serverId: variables.server.id as any,
        content: res.data,
      });
      router.push(`/viewer/${bookId}`);
    },
  });
  return query;
}
export default useQueryBook;
