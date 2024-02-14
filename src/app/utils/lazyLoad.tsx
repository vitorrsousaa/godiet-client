/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Spinner } from '@godiet-ui/Spinner';

import loadable from '@loadable/component';

export const lazyLoad = <T extends Record<string, any>, U extends keyof T>(
  loader: (x?: string) => Promise<T>
) =>
  new Proxy({} as unknown as T, {
    get: (_, componentName: string | symbol) => {
      if (typeof componentName === 'string') {
        return loadable(
          () =>
            Promise.all([
              loader(componentName),
              new Promise((resolve) => setTimeout(resolve, 200)),
            ]).then(([module]) => ({
              default: module[
                componentName as U
              ] as any as React.ComponentType<any>,
            })),
          {
            fallback: (
              <div className="grid h-full w-full place-items-center bg-transparent">
                <Spinner className="fill-gray-200 text-teal-700" />
              </div>
            ),
            cacheKey: () => componentName.toString(),
          }
        );
      }
    },
  });
