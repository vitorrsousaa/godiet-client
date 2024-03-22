import { ReactElement } from 'react';

import {
  render,
  renderHook,
  RenderHookOptions,
  RenderOptions,
} from '@testing-library/react';

import { AllTheProviders } from './providers';

// const renderWithHookForm = (ui: ReactElement, { defaultValues = {} } = {}) => {
//   const Wrapper = ({ children }: { children: ReactElement }) => {
//     const methods = useForm({ defaultValues });
//     return (
//       <AllTheProviders>
//         <FormProvider {...methods}>{children}</FormProvider>
//       </AllTheProviders>
//     );
//   };
//   return { ...render(ui, { wrapper: Wrapper }) };
// };

const customRender = (
  ui: ReactElement,

  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

function customRenderHook<Result, Props>(
  hook: (initialProps: Props) => Result,

  options?: Omit<RenderHookOptions<Props>, 'wrapper'>
) {
  return renderHook(hook, { wrapper: AllTheProviders, ...options });
}

export { customRender, customRenderHook };
