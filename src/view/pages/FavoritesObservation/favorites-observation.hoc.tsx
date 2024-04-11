import React from 'react';

import { FavoritesObservationProps } from './favorites-observation';
import { useFavoritesObservationHook } from './favorites-observation.hook';

export function withHook(
  Component: React.ComponentType<FavoritesObservationProps>
) {
  return function ComponentWithHook() {
    const hook = useFavoritesObservationHook();

    return <Component {...hook} />;
  };
}
