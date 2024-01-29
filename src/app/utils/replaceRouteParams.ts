import { ROUTES } from '@godiet-config';

type TRoute = (typeof ROUTES)[keyof typeof ROUTES] extends string
  ? (typeof ROUTES)[keyof typeof ROUTES]
  : never;

export function replaceRouteParams(
  route: TRoute,
  params: Record<string, string>
): string {
  let originalRoute = route;

  Object.entries(params).map(([key, value]) => {
    originalRoute = originalRoute.replace(`:${key}`, value) as TRoute;
  });

  return originalRoute;
}
