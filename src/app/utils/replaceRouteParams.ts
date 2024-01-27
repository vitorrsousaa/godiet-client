import { ROUTES } from '@godiet-config';

type TRoute = keyof typeof ROUTES;

export function replaceRouteParams(
  route: TRoute,
  params: Record<string, string>
) {
  let originalRoute = ROUTES[route] as string;

  Object.entries(params).map(([key, value]) => {
    originalRoute = originalRoute.replace(`:${key}`, value);
  });

  return originalRoute;
}
