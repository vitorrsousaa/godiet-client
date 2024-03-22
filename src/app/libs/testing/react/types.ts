import { render, RenderHookResult } from '@testing-react';

export type ReturnRenderType = ReturnType<typeof render>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ReturnRenderHookType<T extends (...args: any) => any> =
  RenderHookResult<ReturnType<T>, unknown>;
