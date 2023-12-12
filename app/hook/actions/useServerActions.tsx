import useIndexStore from "@/app/store";
import useSearchParamsUtil from "../useSearchParamsUtil";
import useServerViewerStore from "@/app/store/useServerViewerStore";

function useServerActions() {
  const { setCurrentServer } = useIndexStore();
  const { removeServerConfig } = useServerViewerStore();
  const { createQueryStringFromObj, push } = useSearchParamsUtil();

  const updateCurrentServerAndPushToPath = (server: any) => {
    setCurrentServer(server);
    const qs = createQueryStringFromObj({
      currentServer: JSON.stringify(server),
      currentPath: JSON.stringify(["/"]),
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
