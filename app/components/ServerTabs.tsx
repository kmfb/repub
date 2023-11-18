import { TabList, TabPanel, Tabs } from "@mui/joy";
import React from "react";
import SeverTab from "./SeverTab";
import { ServerConfig } from "../store/useServerViewerStore";
import { AuthType, createClient } from "webdav";

function ServerTabs({ servers }: { servers: ServerConfig[] }) {
  return (
    <Tabs
      aria-label="Vertical tabs"
      orientation="vertical"
      onChange={(event, value) => {
        // const server: any = servers.find((server) => server.url === value);

        // const client = createClient(`http://${server.url}:80`, {
        //   authType: AuthType.Digest,
        //   username: server.username,
        //   password: server.password,
        // });
        // const getDirectoryItems = async () => {
        //   const directoryItems = await client.getDirectoryContents("/");
        //   console.log(directoryItems, "directoryItems");
        // };
        // const dItems = getDirectoryItems();
        // console.log(dItems, "dItems");
        async function logMovies() {
          const response = await fetch("/api/hello");
          const movies = await response.json();
          console.log(movies);
        }
        logMovies();
      }}
    >
      <TabList
        sx={{
          width: "200px",
          height: "94vh",
        }}
      >
        {servers.map((server) => {
          return <SeverTab key={server.url} server={server} />;
        })}
      </TabList>
      <TabPanel value={0}>
        <b>First</b> tab panel
      </TabPanel>
      <TabPanel value={1}>
        <b>Second</b> tab panel
      </TabPanel>
      <TabPanel value={2}>
        <b>Third</b> tab panel
      </TabPanel>
    </Tabs>
  );
}

export default ServerTabs;
