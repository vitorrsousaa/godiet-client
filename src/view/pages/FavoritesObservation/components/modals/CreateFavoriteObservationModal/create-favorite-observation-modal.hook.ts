import React from 'react';

import { CreateFavoriteObservationModalProps } from './create-favorite-observation-modal';

export function useCreateFavoriteObservationModalHook(
  props: CreateFavoriteObservationModalProps
) {
  const { isOpen } = props;

  const [state] = React.useState(0);

  return {
    state,
  };
}
