import { Input } from '@godiet-ui/Input';
import { TextEditor } from '@godiet-ui/TextEditor';

import { Controller } from 'react-hook-form';

import { UseFavoriteObservationFormController } from './favorite-observation-form.controller';
import {
  TCreateFavoriteObservationDTO,
  useFavoriteObservationFormHook,
} from './favorite-observation-form.hook';

export interface FavoriteObservationFormProps {
  isSubmitting: boolean;
  onSubmit: (data: TCreateFavoriteObservationDTO) => Promise<void>;
  formId?: string;
  controller?: UseFavoriteObservationFormController;
  initialValues?: TCreateFavoriteObservationDTO;
}

export function FavoriteObservationForm(props: FavoriteObservationFormProps) {
  const { isSubmitting, formId } = props;

  const { control, handleSubmit } = useFavoriteObservationFormHook(props);

  return (
    <form
      id={formId || 'create-favorite-observation'}
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
      aria-label="form"
    >
      <Controller
        name="title"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input
            placeholder="Nome da observação"
            value={value}
            name="title"
            onChange={onChange}
            error={error?.message}
            minVersion
            disabled={isSubmitting}
          />
        )}
      />

      <Controller
        control={control}
        name="text"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextEditor
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />
    </form>
  );
}
