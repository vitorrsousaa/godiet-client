import { QUERY_CACHE_KEYS } from '@godiet-config';
import { useMutation, useQuery, useQueryClient } from '@godiet-query';
import { patientServices } from '@godiet-services/patient';

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
  const { data, isLoading, isPending, isError } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.PATIENTS, patientId],
    queryFn: () => patientServices.getById(patientId || ''),
    enabled: !!patientId,
  });

  return {
    patient: data,
    isFetchingPatient: isLoading || isPending,
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
