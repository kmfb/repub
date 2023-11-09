"use client";
import Image from "next/image";
import { AuthType, createClient } from "webdav";
import Reader from "./components/Reader";
import ConnectModal from "./components/ConnectModal";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Reader></Reader>
      <ConnectModal />
    </main>
  );
}
