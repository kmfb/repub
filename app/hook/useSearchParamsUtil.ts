import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

function useSearchParamsUtil() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const createQueryStringFromObj = useCallback(
    (obj: Record<string, string>) => {
      const params = new URLSearchParams(searchParams);
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          params.set(key, value);
        }
      }
      return params.toString();
    },
    [searchParams] // No dependencies
  );

  const getQueryValueByKey = useCallback(
    (key: string) => {
      const currentPath = searchParams.get(key);
      if (!currentPath) return null;
      return JSON.parse(currentPath as any);
    },
    [searchParams]
  );

  const push = (qs?: string) => {
    if (!qs) {
      router.push(pathname);
      return;
    }
    router.push(pathname + "?" + qs);
  };

  return {
    getQueryValueByKey,
    createQueryString,
    createQueryStringFromObj,
    push,
  };
}
export default useSearchParamsUtil;
