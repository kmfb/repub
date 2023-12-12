import React, { useCallback, useEffect, useState } from "react";

import {
  Description as DescriptionIcon,
  Folder as FolderIcon,
} from "@mui/icons-material";
import { IServerFormData } from "../interface";
import useQueryBook from "../hook/query/useQueryBook";

import { useRouter, useSearchParams } from "next/navigation";
import { repubCache } from "../utils/cache";
import { getBookId, getFileNameByPath } from "../utils";
import useIndexStore from "../store";
import useQueryDirectoryContents from "../hook/query/useQueryDirectoryContents";

import useBooksContent from "../store/useBooksContent";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { CircularProgress } from "@mui/joy";
import progressStore from "../store/progressStore";
import queryString from "query-string";
import useSearchParamsUtil from "../hook/useSearchParamsUtil";
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
const filenameClass = "ml-2 font-medium truncate";
const ProgressBar = (props: { file: IFile; server: IServerFormData }) => {
  const { file, server } = props;
  const bookId = getBookId(file, server);
  const { subscribe, getState } = progressStore;
  const states: any = getState();
  const currentBook = states.books[bookId];

  const [value, setValue] = useState<any>(
    currentBook ? currentBook.progress * 100 : null
  );

  subscribe((state: any, prev) => {
    if (!state.books[bookId]) return;
    const p: any = state.books[bookId].progress;
    setValue(p * 100);
  });

  if (!_.isNumber(value)) {
    return null;
  }

  return (
    <div>
      <CircularProgress determinate value={value} />
    </div>
  );
};

const FileList: React.FC<FileListProps> = ({ files, server }) => {
  const queryBookMutation = useQueryBook();
  const directoryContentsMutation = useQueryDirectoryContents();
  const router = useRouter();
  const searchParamsUtil = useSearchParamsUtil();
  const { addBook: addBookPersist } = useIndexStore();
  const { addBook } = useBooksContent();
  const searchParams = useSearchParams();
  const { books } = useIndexStore();
  const handleClickFile = async (file: IFile) => {
    if (file.type === "directory") {
      directoryContentsMutation.mutate({
        path: file.filename,
        server,
      });
      return;
    }
    const isEpub = file.filename.endsWith(".epub");
    if (!isEpub) {
      return;
    }
    const bookId = getBookId(file, server);

    const cachedBookRes = await repubCache.read(bookId);

    if (!cachedBookRes) {
      queryBookMutation.mutate({
        file,
        server,
      });
      return;
    }
    const content = await cachedBookRes.blob();
    const book = {
      id: bookId,
      name: file.filename,
      serverId: server.id as any,
      content,
    };
    addBook(book);
    addBookPersist(book);
    router.push(`/viewer/${bookId}`);
  };

  const currentPath = searchParamsUtil.getQueryValueByKey("currentPath");

  if (!files) return null;

  return (
    <div className="flex flex-wrap">
      <h2 className="w-full mb-4">
        {currentPath ? currentPath[currentPath.length - 1] : ""}
      </h2>
      <div className="">
        <div className="flex flex-wrap gap-x-2 gap-y-2">
          {files.map((file) => (
            <div
              className="flex  cursor-pointer items-center rounded-lg border border-gray-200 bg-white p-2 transition hover:border-blue-500 hover:shadow-md"
              onClick={() => handleClickFile(file)}
              key={file.filename}
            >
              <div
                className={`mr-2 flex h-10 w-10 items-center justify-center rounded-full`}
              >
                {getFileIcon(file.type)}
              </div>
              <div className=" mr-2">
                <p className="text-sm font-medium text-black">
                  {getFileNameByPath(file.filename)}
                </p>
              </div>
              <ProgressBar file={file} server={server} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileList;
