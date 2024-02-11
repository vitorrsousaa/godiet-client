import { useCallback } from 'react';

import { ROUTES } from '@godiet-config';
import { replaceRouteParams } from '@godiet-utils/replaceRouteParams';

import { useNavigate as useNavigateRouter } from 'react-router-dom';

export function useNavigate() {
  const navigateRouter = useNavigateRouter();

  const navigate = useCallback(
    (route: keyof typeof ROUTES, replace?: Record<string, string>) => {
      navigateRouter(replaceRouteParams(ROUTES[route], replace || {}));
    },
    [navigateRouter]
  );

  return {
    navigate,
  };
}
