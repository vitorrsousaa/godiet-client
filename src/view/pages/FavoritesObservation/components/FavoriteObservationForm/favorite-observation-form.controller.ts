import { useCallback, useRef } from 'react';

import { UseFormReset } from 'react-hook-form';

import { TCreateFavoriteObservationDTO } from './favorite-observation-form.hook';

export type UseFavoriteObservationFormController = {
  reset: UseFormReset<TCreateFavoriteObservationDTO>;
};

export interface UseFavoriteObservationFormControllerInternal
  extends UseFavoriteObservationFormController {
  _refs: {
    resetRef: React.MutableRefObject<
      UseFormReset<TCreateFavoriteObservationDTO>
    >;
  };
}

export function castToInternalUse(
  controller: UseFavoriteObservationFormController
) {
  return controller as UseFavoriteObservationFormControllerInternal;
}

export function useFavoriteObservationFormController(): UseFavoriteObservationFormController {
  const resetRef = useRef<UseFormReset<TCreateFavoriteObservationDTO>>(
    () => {}
  );

  const reset = useCallback(() => {
    if (resetRef.current) {
      resetRef.current();
    }
  }, []);

  const result: UseFavoriteObservationFormControllerInternal = {
    reset,
    _refs: {
      resetRef,
    },
  };

  return result as UseFavoriteObservationFormController;
}
