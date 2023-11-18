"use client";
import { Tab } from "@mui/joy";
import React from "react";
import { ServerConfig } from "../store/useServerViewerStore";

function SeverTab({ server }: { server: ServerConfig }) {
  return (
    <Tab key={server.url} value={server.url}>
      {server.url}
    </Tab>
  );
}

export default SeverTab;
