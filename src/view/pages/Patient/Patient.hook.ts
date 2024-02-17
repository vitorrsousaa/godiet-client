import { usePatient } from '@godiet-hooks/patient';

export function usePatientHook() {
  const { isFetchingPatient, patient } = usePatient();

  return {
    patient,
    isFetchingPatient,
  };
}
