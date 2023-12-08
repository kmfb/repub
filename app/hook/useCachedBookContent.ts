import { useEffect, useState } from "react";
import { repubCache } from "../utils/cache";

function useCachedBookContent(key: string) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const getCBook = async () => {
      const cachedBookRes: any = await repubCache.read(key);
      if (!cachedBookRes) {
        return () => {};
      }
      const content = await cachedBookRes.blob();
      setData({
        content,
      });
    };
    getCBook();
  }, [key]);

  return data;
}
export default useCachedBookContent;
