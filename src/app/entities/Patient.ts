export type TPatient = {
  id: string;
  userId: string;
  email: string;
  name: string;
  birthDate: string;
  weight: number;
  height: number;
  phone: string;
  gender: 'MASC' | 'FEM';
};
