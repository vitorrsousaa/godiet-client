import { forwardRef, useImperativeHandle } from 'react';

import { Button } from '@godiet-components/Button';
import { DatePicker } from '@godiet-components/DatePicker';
import { Input } from '@godiet-components/Input';
import { ToggleGroup } from '@godiet-components/ToggleGroup';

import { Controller } from 'react-hook-form';

import { UsePatientFormController } from './Patient.controller';
import { FormValues, usePatientFormHook } from './PatientForm.hook';

export interface PatientFormProps {
  onSubmit: (data: FormValues) => Promise<void>;
  onCancel: () => void;
  patient?: FormValues;
  controller?: UsePatientFormController;
}

export interface PatientFormRef {
  setError: (name: keyof FormValues, { message }: { message: string }) => void;
  setFormValues: (value: FormValues) => void;
}

const PatientForm = forwardRef<PatientFormRef, PatientFormProps>(
  (props, ref) => {
    const {
      control,
      errors,
      handleSubmit,
      register,
      handleCancel,
      hookFormSetError,
      setValue,
    } = usePatientFormHook(props);

    useImperativeHandle(
      ref,
      () => ({
        setError: (name, { message }) => hookFormSetError(name, { message }),
        setFormValues: (values) => {
          setValue('name', values.name);
          setValue('email', values.email);
          setValue('birthDate', values.birthDate);
          setValue('gender', values.gender);
        },
      }),
      [hookFormSetError, setValue]
    );

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
          {/* <Input name="phone" type="text" placeholder="Telefone do paciente" /> */}
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
            >
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </>
    );
  }
);

PatientForm.displayName = 'PatientForm';

export { PatientForm };
