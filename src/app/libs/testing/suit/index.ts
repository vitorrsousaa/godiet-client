import { MockInstance } from '@vitest/spy';
import { vi } from 'vitest';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SpyInstance<T> = MockInstance<any, Partial<T>>;

const customClearAllMocks = vi.clearAllMocks;

const mock = vi.mock;

export { customClearAllMocks as clearAllMocks, mock };

export * from '@vitest/spy';

export { type SpyInstance };
