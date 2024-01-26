import { useCallback, useRef } from 'react';

import { UseFormSetError, UseFormSetValue } from 'react-hook-form';

import { FormValues } from './PatientForm.hook';

export type UsePatientFormController = {
  setFormValues: (values: FormValues) => void;
  setError: (name: keyof FormValues, { message }: { message: string }) => void;
};

export interface UsePatientFormControllerInternal
  extends UsePatientFormController {
  _refs: {
    setValuesRef: React.MutableRefObject<UseFormSetValue<FormValues>>;
    setErrorRef: React.MutableRefObject<UseFormSetError<FormValues>>;
  };
}

export function castToInternalUse(controller: UsePatientFormController) {
  return controller as UsePatientFormControllerInternal;
}

export function usePatientFormController(): UsePatientFormController {
  const setValueRef = useRef<UseFormSetValue<FormValues>>(() => {});
  const setErrorRef = useRef<UseFormSetError<FormValues>>(() => {});

  const setFormValues = useCallback((values: FormValues) => {
    if (setValueRef.current) {
      setValueRef.current('name', values.name);
      setValueRef.current('email', values.email);
      setValueRef.current('birthDate', values.birthDate);
      setValueRef.current('gender', values.gender);
    }
  }, []);

  const setError = useCallback(
    (name: keyof FormValues, { message }: { message: string }) => {
      if (setErrorRef.current) {
        setErrorRef.current(name, { message });
      }
    },
    []
  );

  const result: UsePatientFormControllerInternal = {
    setFormValues,
    setError,
    _refs: {
      setValuesRef: setValueRef,
      setErrorRef,
    },
  };

  return result as UsePatientFormController;
}
