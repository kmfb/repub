import { CircularProgress, TabList, TabPanel, Tabs } from "@mui/joy";
import React from "react";
import SeverTab from "./SeverTab";

import { IServerFormData } from "../interface";

import useQueryDirectoryContents from "../hook/query/useQueryDirectoryContents";
import _ from "lodash";
import FileList from "./FileList";
import useIndexStore from "../store";

import useSearchParamsUtil from "../hook/useSearchParamsUtil";
import { useQuery } from "@tanstack/react-query";
import { getDirectoryContents } from "../clientApi";
import useSyncPagination from "../hook/query/useSyncPagination";
import useQueryFileList from "../hook/query/useQueryFileList";
import useServerActions from "../hook/actions/useServerActions";
function ServerTabs({ servers }: { servers: IServerFormData[] }) {
  const { updateCurrentServerAndPushToPath } = useServerActions();
  const { getQueryValueByKey } = useSearchParamsUtil();
  useSyncPagination();
  const { fileList, isLoading } = useQueryFileList();

  const currentServer = getQueryValueByKey("currentServer");

  return (
    <Tabs
      aria-label="Vertical tabs"
      orientation="vertical"
      value={currentServer ? currentServer?.id : null}
    >
      <TabList
        sx={{
          width: "300px",
          height: "94vh",
        }}
      >
        {servers.map((server) => {
          return <SeverTab key={server.id} server={server} />;
        })}
      </TabList>

      <TabPanel value={currentServer?.id}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <FileList files={fileList} server={currentServer} />
        )}
      </TabPanel>
    </Tabs>
  );
}

export default ServerTabs;
