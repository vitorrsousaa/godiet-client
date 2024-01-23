import { routes } from '@godiet-config';

type TRoute = keyof typeof routes;

export function replaceRouteParams(
  route: TRoute,
  params: Record<string, string>
) {
  let originalRoute = routes[route] as string;

  Object.entries(params).map(([key, value]) => {
    originalRoute = originalRoute.replace(`:${key}`, value);
  });

  return originalRoute;
}
