import React from 'react';

import { PatientsProps } from './patients';
import { usePatientsHook } from './patients.hook';

export function withHook(Component: React.ComponentType<PatientsProps>) {
  return function ComponentWithHook() {
    const hook = usePatientsHook();

    return <Component {...hook} />;
  };
}
