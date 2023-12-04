import React, { useEffect } from "react";

import {
  Description as DescriptionIcon,
  Folder as FolderIcon,
} from "@mui/icons-material";
import { IServerFormData } from "../interface";
import useQueryBook from "../hook/query/useQueryBook";

import { useRouter } from "next/navigation";
import { repubCache } from "../utils/cache";
import { getBookId, getFileNameByPath } from "../utils";
import useIndexStore from "../store";
import useQueryDirectoryContents from "../hook/query/useQueryDirectoryContents";
import { initialCurrentLocation } from "../viewer/[bookId]/components/Reader/slices/book";
export interface IFile {
  filename: string;
  basename: string;
  lastmod: string;
  size: number;
  type: "file" | "directory";
}

interface FileListProps {
  files: IFile[];
  server: IServerFormData;
}

const getFileIcon = (type: string) => {
  switch (type) {
    case "file":
      return <DescriptionIcon />;
    case "directory":
      return <FolderIcon />;
    default:
      return null;
  }
};

const FileList: React.FC<FileListProps> = ({ files, server }) => {
  const queryBookMutation = useQueryBook();
  const directoryContentsMutation = useQueryDirectoryContents();
  const router = useRouter();
  const { addBook, currentPath } = useIndexStore();
  console.log(currentPath, "currentPath");
  const { books } = useIndexStore();
  const handleClickFile = async (file: IFile) => {
    if (file.type === "file") {
      const bookId = getBookId(file, server);
      const cachedBookRes = await repubCache.read(bookId);
      debugger;
      if (!cachedBookRes) {
        debugger;
        queryBookMutation.mutate({
          file,
          server,
        });
        return;
      }
      const content = await cachedBookRes.blob();

      addBook({
        id: bookId,
        name: file.filename,
        location: {
          chapterName: "Introduction",
          currentPage: 164,
          totalPage: 627,
          startCfi: "epubcfi(/6/12!/4/2[introduction_1]/20/1:231)",
          endCfi: "epubcfi(/6/12!/4/2[introduction_1]/26/1:237)",
          base: "/6/12",
        },
        serverId: server.id as any,
        content,
      });
      router.push(`/viewer/${bookId}`);
    } else {
      directoryContentsMutation.mutate({
        path: file.filename,
        server,
      });
    }
  };
  useEffect(() => {
    console.log("sync server", books);
  }, [books]);
  if (!files) return null;

  return (
    <div className="flex flex-wrap">
      <h2 className="w-full mb-4">{currentPath[currentPath.length - 1]}</h2>

      {files.map((file) => (
        <div
          key={file.filename}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2 cursor-pointer"
          onClick={() => handleClickFile(file)}
        >
          <div className="border border-gray-300 rounded-lg p-3 flex items-center">
            {getFileIcon(file.type)}
            <p className="ml-2 font-medium truncate">
              {getFileNameByPath(file.filename)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileList;
