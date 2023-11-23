import Image from "next/image";
import { AuthType, createClient } from "webdav";
import Reader from "./components/Reader";
import ConnectModal from "./components/ConnectModal";
import ServerViewer from "./components/ServerViewer";


export default function Home() {
  return (
    <main>
      <ServerViewer></ServerViewer>
      <ConnectModal />
    </main>
  );
}
