import { CircularProgress, TabList, TabPanel, Tabs } from "@mui/joy";
import React, { useEffect } from "react";
import SeverTab from "./SeverTab";

import { AuthType, createClient } from "webdav";
import { IServerFormData } from "../interface";
import { getSeverId } from "../utils";
import useQueryDirectoryContents from "../hook/query/useQueryDirectoryContents";
import _ from "lodash";
import FileList from "./FileList";
import useIndexStore from "../store";
import queryString from "query-string";
import { useRouter } from "next/router";
import useSearchParamsUtil from "../hook/useSearchParamsUtil";
import { useQuery } from "@tanstack/react-query";
import { getDirectoryContents } from "../clientApi";
function ServerTabs({ servers }: { servers: IServerFormData[] }) {
  const directoryContentsMutation = useQueryDirectoryContents();
  const {
    getQueryValueByKey,
    createQueryString,
    createQueryStringFromObj,
    push,
  } = useSearchParamsUtil();

  const currentServer = getQueryValueByKey("currentServer");
  const currentPath = getQueryValueByKey("currentPath");

  const { data: fileListsRes } = useQuery({
    queryKey: ["fileLists", currentPath],
    queryFn: () =>
      getDirectoryContents(currentPath[currentPath.length - 1], currentServer),
    enabled: !!currentPath,
  });

  const fileLists = _.get(fileListsRes, "data.data");

  return (
    <Tabs
      aria-label="Vertical tabs"
      orientation="vertical"
      value={currentServer ? currentServer?.id : null}
      onChange={(event, value) => {
        const server: any = servers.find((server) => server.id === value);

        const qs = createQueryStringFromObj({
          currentServer: JSON.stringify(server),
          currentPath: JSON.stringify(["/"]),
        });
        push(qs);
      }}
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
        {directoryContentsMutation.isPending ? (
          <CircularProgress />
        ) : (
          <FileList files={fileLists} server={currentServer} />
        )}
      </TabPanel>
    </Tabs>
  );
}

export default ServerTabs;
