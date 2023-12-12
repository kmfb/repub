import useIndexStore from "@/app/store";
import useSearchParamsUtil from "../useSearchParamsUtil";
import useServerViewerStore from "@/app/store/useServerViewerStore";
import { IServerFormData } from "@/app/interface";
import { getBasePathFromHost } from "@/app/utils";

function useServerActions() {
  const { setCurrentServer } = useIndexStore();
  const { removeServerConfig } = useServerViewerStore();
  const { createQueryStringFromObj, push } = useSearchParamsUtil();

  const updateCurrentServerAndPushToPath = (server: IServerFormData) => {
    const [host, basePath] = getBasePathFromHost(server.host);
    setCurrentServer(server);
    const currentPath = [basePath];
    const qs = createQueryStringFromObj({
      currentServer: JSON.stringify(server),
      currentPath: JSON.stringify(currentPath),
    });
 
    push(qs);
  };

  const removeServer = (serverId: any) => {
    removeServerConfig(serverId);
    push();
  };
  return {
    updateCurrentServerAndPushToPath,
    removeServer,
  };
}
export default useServerActions;
