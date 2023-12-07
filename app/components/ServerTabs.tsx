import { CircularProgress, TabList, TabPanel, Tabs } from "@mui/joy";
import React from "react";
import SeverTab from "./SeverTab";

import { AuthType, createClient } from "webdav";
import { IServerFormData } from "../interface";
import { getSeverId } from "../utils";
import useQueryDirectoryContents from "../hook/query/useQueryDirectoryContents";
import _ from "lodash";
import FileList from "./FileList";
import useIndexStore from "../store";
function ServerTabs({ servers }: { servers: IServerFormData[] }) {
  const directoryContentsMutation = useQueryDirectoryContents();

  const { fileLists, setCurrentServer, currentServer } = useIndexStore();

  return (
    <Tabs
      aria-label="Vertical tabs"
      orientation="vertical"
      value={currentServer.id}
      onChange={(event, value) => {
        const server: any = servers.find((server) => server.id === value);
        directoryContentsMutation.mutate(
          {
            path: "/",
            server,
          },
          {
            onSuccess: (res, variables) => {
              setCurrentServer(variables.server);
            },
          }
        );
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
