import { CircularProgress, TabList, TabPanel, Tabs } from "@mui/joy";
import React from "react";
import SeverTab from "./SeverTab";

import { IServerFormData } from "../interface";

import useQueryDirectoryContents from "../hook/query/useQueryDirectoryContents";
import _ from "lodash";
import FileList from "./FileList";
import useIndexStore from "../store";

import useSearchParamsUtil from "../hook/useSearchParamsUtil";

import useSyncPagination from "../hook/query/useSyncPagination";
import useQueryFileList from "../hook/query/useQueryFileList";
import useServerActions from "../hook/actions/useServerActions";
import useDeviceWidth from "../hook/useDeviceWidth";
function ServerTabs({ servers }: { servers: IServerFormData[] }) {
  const { updateCurrentServerAndPushToPath } = useServerActions();
  const screenWidth = useDeviceWidth();

  useSyncPagination();
  const { fileList, isLoading } = useQueryFileList();
  const { getQueryValueByKey } = useSearchParamsUtil();
  const currentServer = getQueryValueByKey("currentServer");
  const isDesktop = screenWidth >= 768;
  const propsByDevice: any = isDesktop
    ? {
        Tabs: {
          "aria-label": "Vertical tabs",
          orientation: "vertical",
        },
        TabList: {
          sx: {
            width: "300px",
            height: "94vh",
          },
        },
      }
    : {};
  return (
    <Tabs
      {...propsByDevice.Tabs}
      value={currentServer ? currentServer?.id : null}
    >
      <TabList {...propsByDevice.TabList}>
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
