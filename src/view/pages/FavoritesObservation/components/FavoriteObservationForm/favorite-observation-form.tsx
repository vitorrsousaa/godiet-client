import { FormField } from '@godiet-ui/FormField';
import { Input } from '@godiet-ui/Input';
import { TextEditor } from '@godiet-ui/TextEditor';
import { cn } from '@godiet-utils/cn';

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
  className?: string;
}

export function FavoriteObservationForm(props: FavoriteObservationFormProps) {
  const { isSubmitting, formId, className } = props;

  const { control, handleSubmit } = useFavoriteObservationFormHook(props);

  return (
    <form
      id={formId || 'create-favorite-observation'}
      className={cn('flex flex-col gap-4', className)}
      onSubmit={handleSubmit}
      aria-label="form"
    >
      <FormField.Controller
        name="title"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormField.Item error={error?.message}>
            <FormField.Label>Nome da observação</FormField.Label>
            <FormField.Control>
              <Input
                placeholder="Observação favorita"
                value={value}
                name="title"
                onChange={onChange}
                disabled={isSubmitting}
              />
            </FormField.Control>
            <FormField.Description>
              Dê um nome para a sua observação favorita
            </FormField.Description>
            <FormField.Message />
          </FormField.Item>
        )}
      />

      <FormField.Controller
        control={control}
        name="text"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormField.Item error={error?.message}>
            <FormField.Label>Texto da observação</FormField.Label>
            <FormField.Control>
              <TextEditor
                value={value}
                onChange={onChange}
                disabled={isSubmitting}
              />
            </FormField.Control>

            <FormField.Message />
          </FormField.Item>
        )}
      />
    </form>
  );
}
