import { httpClient } from '@godiet-services/httpClient';

interface CreatePatientInput {
  patient: {
    email: string;
    name: string;
    gender: string;
    birthDate: Date;
    phone: string;
  };
}

export async function create(createPatientInput: CreatePatientInput) {
  const { data } = await httpClient.post(
    '/patient',
    createPatientInput.patient
  );

  return data;
}
