import { Button } from '@godiet-ui/Button';
import { DatePicker } from '@godiet-ui/DatePicker';
import { Input } from '@godiet-ui/Input';
import { ToggleGroup } from '@godiet-ui/ToggleGroup';

import { Controller } from 'react-hook-form';

import { UsePatientFormController } from './Patient.controller';
import { FormValues, usePatientFormHook } from './PatientForm.hook';

export interface PatientFormProps {
  onSubmit: (data: FormValues) => Promise<void>;
  onCancel: () => void;
  patient?: FormValues;
  controller?: UsePatientFormController;
  isLoading?: boolean;
}

export interface PatientFormRef {
  setError: (name: keyof FormValues, { message }: { message: string }) => void;
  setFormValues: (value: FormValues) => void;
}

function PatientForm(props: PatientFormProps) {
  const { isLoading } = props;

  const { control, errors, handleSubmit, register, handleCancel } =
    usePatientFormHook(props);

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nome do paciente"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          type="email"
          placeholder="E-mail do paciente"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          type="tel"
          placeholder="Telefone do paciente"
          error={errors.phone?.message}
          {...register('phone')}
        />
        <Controller
          control={control}
          name="birthDate"
          render={({ field: { onChange, value } }) => (
            <DatePicker
              error={errors.birthDate?.message}
              disabledAfterDays
              onChange={onChange}
              value={value}
              placeholder={'Data de nascimento'}
            />
          )}
        />

        <div>
          <small className="text-xs text-muted-foreground sm:text-sm">
            Selecione o gênero:
          </small>
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <ToggleGroup.Root
                type="single"
                defaultValue="MASC"
                onValueChange={onChange}
                value={value}
              >
                <ToggleGroup.Item value="MASC" variant={'outline'}>
                  MASC
                </ToggleGroup.Item>
                <ToggleGroup.Item value="FEM" variant={'outline'}>
                  FEM
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            )}
          />
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Button
            variant={'destructive'}
            className="mt-2 sm:mt-0"
            onClick={handleCancel}
            type="button"
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Salvar
          </Button>
        </div>
      </form>
    </>
  );
}

PatientForm.displayName = 'PatientForm';

export { PatientForm };
