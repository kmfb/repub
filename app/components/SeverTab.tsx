"use client";
import { Tab } from "@mui/joy";
import React from "react";
import { IServerFormData } from "../interface";
import { getSeverId } from "../utils";

function SeverTab({ server }: { server: IServerFormData }) {
  return <Tab value={server.id}>{getSeverId(server)}</Tab>;
}

export default SeverTab;
