import React from "react";

import {
  Description as DescriptionIcon,
  Folder as FolderIcon,
} from "@mui/icons-material";
import { IServerFormData } from "../interface";
import useQueryBook from "../hook/query/useQueryBook";

import { useRouter } from "next/navigation";
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
  const router = useRouter();
  if (!files) return null;

  const handleClickFile = (file: IFile) => {
    if (file.type === "file") {
      queryBookMutation.mutate({
        file,
        server,
      });
    }
  };
  return (
    <div className="flex flex-wrap">
      <h2 className="w-full mb-4">File List</h2>
      {files.map((file, index) => (
        <div
          key={file.filename}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4 cursor-pointer"
          onClick={() => handleClickFile(file)}
        >
          <div className="border border-gray-300 rounded-lg p-4 flex items-center">
            {getFileIcon(file.type)}
            <div className="ml-2">
              <p>Filename: {file.filename}</p>
              <p>Basename: {file.basename}</p>
              <p>Last Modified: {file.lastmod}</p>
              <p>Size: {file.size} bytes</p>
              {/* Render additional properties */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileList;
