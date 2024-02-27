import { QUERY_CACHE_KEYS } from '@godiet-config';
import { useMutation, useQuery, useQueryClient } from '@godiet-query';
import { patientServices } from '@godiet-services/patient';

import { useParams } from 'react-router-dom';

export function usePatient() {
  const { id } = useParams<{ id: string }>();

  const { isFetchingPatient, patient, isErrorPatient } = useGetByPatientId(id);

  return {
    patient,
    isFetchingPatient,
    isErrorPatient,
  };
}

export function useCreatePatient() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: createPatient } = useMutation({
    mutationFn: patientServices.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_CACHE_KEYS.PATIENTS],
      });
    },
  });

  return {
    isCreatingPatient: isPending,
    createPatient,
  };
}

export function useGetByPatientId(patientId: string | undefined) {
  const { data, isLoading, isPending, isError, isFetching } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.PATIENTS, patientId],
    queryFn: () => patientServices.getById(patientId || ''),
    enabled: !!patientId,
  });

  return {
    patient: data,
    isFetchingPatient: isLoading || isPending || isFetching,
    isErrorPatient: isError,
  };
}

export function useGetAllPatients() {
  const { data, isLoading, isPending } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.PATIENTS],
    queryFn: patientServices.getAll,
  });

  return {
    patients: data ?? [],
    isFetchingPatients: isLoading || isPending,
  };
}

export function useUpdatePatient(patientId: string) {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: patientServices.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_CACHE_KEYS.PATIENTS, patientId],
      });
    },
  });

  return {
    isUpdatingPatient: isPending,
    updatePatient: mutateAsync,
  };
}
