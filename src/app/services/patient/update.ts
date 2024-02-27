import { httpClient } from '@godiet-services/httpClient';

interface CreatePatientInput {
  patientId: string;
  patient: {
    email: string;
    name: string;
    gender: string;
    birthDate: Date;
    phone: string;
  };
}

export async function update(createPatientInput: CreatePatientInput) {
  const { patient, patientId } = createPatientInput;
  const { data } = await httpClient.put(`/patient/${patientId}`, patient);

  return data;
}
