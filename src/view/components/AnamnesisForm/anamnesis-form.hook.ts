import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { AnamnesisFormProps } from './anamnesis-form';
import {
  AnamnesisFormSchema,
  defaultInitialValues,
  TCreateAnamnesisFormDTO,
} from './anamnesis-form.schema';

export function useAnamnesisFormHook(props: AnamnesisFormProps) {
  const { initialValues, formId: propFormId, onSubmit } = props;

  const methods = useForm<TCreateAnamnesisFormDTO>({
    resolver: zodResolver(AnamnesisFormSchema),
    defaultValues: initialValues || defaultInitialValues,
  });

  const { handleSubmit: hookFormSubmit, control } = methods;

  const handleSubmit = hookFormSubmit(async (data) => {
    if (data.text.length === 0 || data.title.length === 0) return;
    await onSubmit(data);
  });

  const formId = propFormId || 'anamnesis-form';

  return {
    formId,
    control,
    handleSubmit,
  };
}
