import { useState } from 'react';

import { useCallbackRef } from './use-callback-ref';

export interface UseControllableStateProps<T> {
  value?: T;
  defaultValue?: T | (() => T);
  onChange?: (value: T) => void;
  shouldUpdate?: (prev: T, next: T) => boolean;
}

export function useControllableState<T>(props: UseControllableStateProps<T>) {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    shouldUpdate = (prev, next) => prev !== next,
  } = props;

  const onChangeProp = useCallbackRef(onChange);
  const shouldUpdateProp = useCallbackRef(shouldUpdate);

  const [uncontrollableState, setUncontrollableState] = useState(
    defaultValue as T
  );

  const controlled = valueProp !== undefined;
  const value = controlled ? valueProp : uncontrollableState;

  const setInternalState = useCallbackRef(
    (next: React.SetStateAction<T>) => {
      const valueSetter = next as (prevState?: T) => T;

      const newValue = typeof next === 'function' ? valueSetter(value) : next;

      if (!shouldUpdateProp(value, newValue)) return;

      if (!controlled) {
        setUncontrollableState(newValue);
      }

      onChangeProp(newValue);
    },
    [controlled, onChangeProp, value, shouldUpdateProp]
  );

  return [value, setInternalState, controlled] as [
    T,
    React.Dispatch<React.SetStateAction<T>>,
    boolean,
  ];
}
