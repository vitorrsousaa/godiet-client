import { Button } from '@godiet-components/Button';
import { Input } from '@godiet-components/Input';
import { Modal } from '@godiet-components/Modal';
import { ToggleGroup } from '@godiet-components/ToggleGroup';

import { Controller } from 'react-hook-form';

import { useCreatePatientModalHook } from './CreatePatientModal.hook';

export interface CreatePatientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePatientModal(props: CreatePatientModalProps) {
  const { isOpen, onClose } = props;

  const { errors, control, handleSubmit, register } =
    useCreatePatientModalHook(props);

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>Criar novo paciente</Modal.Title>
        <Modal.Description>
          Preencha as informações abaixo. Os demais dados podem ser completados
          na ficha do paciente.
        </Modal.Description>
      </Modal.Header>
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
        <Input
          type="date"
          placeholder="Data de nascimento"
          error={errors.birthDate?.message}
          {...register('birthDate')}
        />
        <div>
          <small className="text-xs sm:text-sm">Selecione o gênero:</small>
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

        <Modal.Footer>
          <Button
            variant={'destructive'}
            className="mt-2 sm:mt-0"
            onClick={onClose}
            type="button"
          >
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </Modal.Footer>
      </form>
    </Modal.Root>
  );
}
