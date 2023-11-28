import Image from "next/image";
import { AuthType, createClient } from "webdav";
import Reader from "./components/Reader";
import ConnectModal from "./components/ConnectModal";
import ServerViewer from "./components/ServerViewer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <main>
      <ServerViewer></ServerViewer>
      <ConnectModal />
      <ToastContainer />
    </main>
  );
}
