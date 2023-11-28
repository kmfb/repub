import { CircularProgress, TabList, TabPanel, Tabs } from "@mui/joy";
import React from "react";
import SeverTab from "./SeverTab";

import { AuthType, createClient } from "webdav";
import { IServerFormData } from "../interface";
import { getSeverId } from "../utils";
import useQueryDirectoryContents from "../hook/query/useQueryDirectoryContents";
import _ from "lodash";
import FileList from "./FileList";
function ServerTabs({ servers }: { servers: IServerFormData[] }) {
  const directoryContentsMutation = useQueryDirectoryContents();
  console.log(directoryContentsMutation, "directoryContentsMutation");
  const files = _.get(directoryContentsMutation, "data.data.data");
  const clickedServer = _.get(directoryContentsMutation, "variables.server");
  console.log(files, "directoryContents");
  
  
  return (
    <Tabs
      aria-label="Vertical tabs"
      orientation="vertical"
      onChange={(event, value) => {
        const server: any = servers.find((server) => server.id === value);
        directoryContentsMutation.mutate({
          path: "/",
          server,
        });
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

      <TabPanel value={clickedServer?.id}>
        {directoryContentsMutation.isPending ? <CircularProgress /> : <FileList files={files} />}
      </TabPanel>
    </Tabs>
  );
}

export default ServerTabs;
