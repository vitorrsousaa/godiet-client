import React from 'react';

import { CreateAnamneseProps } from './create-anamnese';
import { useCreateAnamneseHook } from './create-anamnese.hook';

export function withHook(Component: React.ComponentType<CreateAnamneseProps>) {
  return function ComponentWithHook() {
    const hook = useCreateAnamneseHook();

    return <Component {...hook} />;
  };
}
