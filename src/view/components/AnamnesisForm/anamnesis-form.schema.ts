import * as z from 'zod';

export const AnamnesisFormSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  text: z.string().min(1, 'O texto é obrigatório'),
});

export const defaultInitialValues = {
  text: '',
  title: '',
};

export type TCreateAnamnesisFormDTO = z.infer<typeof AnamnesisFormSchema>;
