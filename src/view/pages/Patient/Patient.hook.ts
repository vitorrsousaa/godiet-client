import { useGetByPatientId } from '@godiet-hooks/patient';

import { useParams } from 'react-router-dom';

export function usePatientHook() {
  const { id } = useParams<{ id: string }>();

  const { isFetchingPatient, patient } = useGetByPatientId(id);

  return {
    patient,
    isFetchingPatient,
  };
}
