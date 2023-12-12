"use client";
import { IconButton, ListItemDecorator, Tab, Typography } from "@mui/joy";
import React from "react";
import { IServerFormData } from "../interface";
import { getSeverId } from "../utils";
import { Icon } from "@mui/material";
import { ComputerRounded, Delete, Edit } from "@mui/icons-material";
import useAddServerModal from "../store/useAddServerModal";
import AlertDialogModal from "../ui/AlertDialog";
import useServerActions from "../hook/actions/useServerActions";

function SeverTab({ server }: { server: IServerFormData }) {
 
  const { open, setOpen, setCurrentEditServer } = useAddServerModal();
  const { removeServer, updateCurrentServerAndPushToPath } = useServerActions();
  const handleOpenEditServerModal = () => {
    setOpen(true);
    setCurrentEditServer(server);
  };
  const handleRemoveServer = (server: IServerFormData) => {
   
    removeServer(server.id);
  };
  return (
    <Tab value={server.id}>
      <ListItemDecorator>
        <ComputerRounded></ComputerRounded>
      </ListItemDecorator>

      <div
        className="text-ellipsis w-10/12 overflow-hidden"
        onClick={() => {
          updateCurrentServerAndPushToPath(server);
        }}
      >
        {getSeverId(server)}
      </div>
      <IconButton variant="plain" onClick={handleOpenEditServerModal}>
        <Edit />
      </IconButton>

      <AlertDialogModal onConfirm={() => handleRemoveServer(server)} />
    </Tab>
  );
}

export default SeverTab;
