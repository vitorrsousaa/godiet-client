import { useCallback } from 'react';

import { ROUTES } from '@godiet-config';
import { replaceRouteParams } from '@godiet-utils/replaceRouteParams';

import { useNavigate as useNavigateRouter } from 'react-router-dom';

interface NavigateOptions {
  replace?: Record<string, string>;
  state?: Record<string, unknown>;
}

export function useNavigate() {
  const navigateRouter = useNavigateRouter();

  const navigate = useCallback(
    (route: keyof typeof ROUTES, options?: NavigateOptions) => {
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
