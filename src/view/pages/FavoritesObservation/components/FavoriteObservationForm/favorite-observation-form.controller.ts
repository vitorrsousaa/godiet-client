import { useCallback, useMemo, useRef } from 'react';

import { UseFormReset } from 'react-hook-form';

import { TCreateFavoriteObservationDTO } from './favorite-observation-form.hook';

export type UseFavoriteObservationFormController = {
  reset: UseFormReset<TCreateFavoriteObservationDTO>;
  isValid: boolean;
};

export interface UseFavoriteObservationFormControllerInternal
  extends UseFavoriteObservationFormController {
  _refs: {
    resetRef: React.MutableRefObject<
      UseFormReset<TCreateFavoriteObservationDTO>
    >;
    isValidRef: React.MutableRefObject<boolean>;
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
  const isValidRef = useRef<boolean>(false);

  const isValid = useMemo(() => isValidRef.current, []);

  const reset = useCallback(() => {
    if (resetRef.current) {
      resetRef.current();
    }
  }, []);

  const result: UseFavoriteObservationFormControllerInternal = {
    reset,
    isValid,
    _refs: {
      resetRef,
      isValidRef,
    },
  };

  return result as UseFavoriteObservationFormController;
}
