"use client";
import { Add, Person, PlusOne } from "@mui/icons-material";
import { Box, Button, Sheet, Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import React from "react";
import useAddServerModal from "../store/useAddServerModal";
import useServerViewerStore from "../store/useServerViewerStore";
import SeverTab from "./SeverTab";
import ServerTabs from "./ServerTabs";

function TabsForSelectServer() {
  const { open, setOpen } = useAddServerModal();
  const { servers } = useServerViewerStore();
  return (
    <div>
      <Sheet>
        <div className="header-container">
          <div className="add-server-button-container">
            <Button
              variant="plain"
              endDecorator={<Add></Add>}
              onClick={() => setOpen(true)}
            >
              添加服务器
            </Button>
          </div>
          <div className="path"></div>
        </div>
      </Sheet>
      <ServerTabs servers={servers} />
    </div>
  );
}

export default TabsForSelectServer;
