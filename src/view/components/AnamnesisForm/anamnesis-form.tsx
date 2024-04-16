import { FormField } from '@godiet-ui/FormField';
import { Input } from '@godiet-ui/Input';
import { TextEditor } from '@godiet-ui/TextEditor';

import { useAnamnesisFormHook } from './anamnesis-form.hook';
import { TCreateAnamnesisFormDTO } from './anamnesis-form.schema';

export interface AnamnesisFormProps {
  formId?: string;
  isSubmitting?: boolean;
  initialValues?: TCreateAnamnesisFormDTO;
  onSubmit: (data: TCreateAnamnesisFormDTO) => Promise<void>;
}

export function AnamnesisForm(props: AnamnesisFormProps) {
  const { isSubmitting } = props;

  const { formId, control, handleSubmit } = useAnamnesisFormHook(props);

  return (
    <div>
      <form id={formId} aria-label="form" onSubmit={handleSubmit}>
        <FormField.Controller
          name="title"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormField.Item error={error?.message}>
              <FormField.Label>Nome da anamnese</FormField.Label>
              <FormField.Control>
                <Input
                  placeholder="Anamnese"
                  value={value}
                  name="title"
                  onChange={onChange}
                  minVersion
                  disabled={isSubmitting}
                />
              </FormField.Control>
              <FormField.Description>
                Dê um nome para esta anamnese do paciente.
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
              <FormField.Label>Texto da anamnese</FormField.Label>
              <FormField.Control>
                <TextEditor
                  value={value}
                  onChange={onChange}
                  disabled={isSubmitting}
                  name="text"
                  error={error?.message}
                />
              </FormField.Control>

              <FormField.Message />
            </FormField.Item>
          )}
        />
      </form>
    </div>
  );
}
