import { usePatientHook } from './Patient.hook';

export function Patient() {
  const { patient, isFetchingPatient } = usePatientHook();

  return (
    <div className="flex flex-col gap-4">
      {isFetchingPatient ? (
        <div>Carregando...</div>
      ) : patient ? (
        <></>
      ) : (
        <div>Paciente não encontrado</div>
      )}
    </div>
  );
}
