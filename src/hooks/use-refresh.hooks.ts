import { routePath } from "./../constants/route-paths";
import { useEffect } from "react";

export const useRefresh = (
  history: any,
  path: string,
  resetRoute: string = routePath.home
) => {
  let handler: any;

  const refresh = () => {
    history.push(resetRoute);

    handler = setTimeout(() => history.push(path), 10);
  };

  useEffect(() => {
    return () => handler && clearTimeout(handler);
  }, [handler]);

  return refresh;
};
