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

import useBooksContent from "../store/useBooksContent";
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
  const { currentPath } = useIndexStore();
  const { addBook } = useBooksContent();
  console.log(currentPath, "currentPath");
  const { books } = useIndexStore();
  const handleClickFile = async (file: IFile) => {
    if (file.type === "directory") {
      directoryContentsMutation.mutate({
        path: file.filename,
        server,
      });
      return;
    }

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
      location: "",
      serverId: server.id as any,
      content,
    });
    router.push(`/viewer/${bookId}`);
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
