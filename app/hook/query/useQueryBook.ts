import { getDirectoryContents, getFile } from "@/app/clientApi";
import { IFile } from "@/app/components/FileList";
import { IServerFormData } from "@/app/interface";
import useIndexStore from "@/app/store";
import useBooksContent from "@/app/store/useBooksContent";
import { getBookId } from "@/app/utils";
import { repubCache } from "@/app/utils/cache";
import { initialCurrentLocation } from "@/app/viewer/[bookId]/components/Reader/slices/book";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

function useQueryBook() {
  const { addBook } = useBooksContent();
  const router = useRouter();

  const query = useMutation({
    mutationKey: ["useQueryBook"],
    mutationFn: ({ file, server }: { file: IFile; server: IServerFormData }) =>
      getFile(file, server),
    onSuccess: async (res, variables) => {
      console.log(res, "im use");
      const bookId = getBookId(variables.file, variables.server);
      const cachedBookRes = await repubCache.read(bookId);
      console.log(cachedBookRes, "im cachedBook");
      if (!cachedBookRes) {
        await repubCache.create(bookId, new Response(res.data));
      }

      addBook({
        id: bookId,
        name: variables.file.filename,
        location: initialCurrentLocation,
        serverId: variables.server.id as any,
        content: res.data,
      });

      router.push(`/viewer/${bookId}`);
    },
  });
  return query;
}
export default useQueryBook;
