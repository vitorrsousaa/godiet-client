/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback } from 'react';

import { ROUTES } from '@godiet-config';
import { replaceRouteParams } from '@godiet-utils/replaceRouteParams';

import { useNavigate as useNavigateRouter } from 'react-router-dom';

type RouteKey = keyof typeof ROUTES;

type GetPath<R extends RouteKey> = (typeof ROUTES)[R];

type ExtractPathParams<R extends string> =
  R extends `${infer _}:${infer Param}/${infer Rest}`
    ? { [K in Param]: string } & ExtractPathParams<Rest>
    : R extends `${infer _}:${infer Param}`
      ? { [K in Param]: string }
      : undefined;

interface NavigateOptions<TRouteKey extends string> {
  replace?: ExtractPathParams<TRouteKey>;
  state?: Record<string, unknown>;
}

export function useNavigate() {
  const navigateRouter = useNavigateRouter();

  const navigate = useCallback(
    <T extends RouteKey>(
      route: keyof typeof ROUTES,
      options?: NavigateOptions<GetPath<T>>
    ) => {
      navigateRouter(
        replaceRouteParams(ROUTES[route], options?.replace || {}),
        {
          state: options?.state,
        }
      );
    },
    [navigateRouter]
  );

  return {
    navigate,
  };
}
