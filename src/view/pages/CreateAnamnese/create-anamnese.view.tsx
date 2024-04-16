import {
  AnamnesisForm,
  TCreateAnamnesisFormDTO,
} from '@godiet-components/AnamnesisForm';
import { Button } from '@godiet-ui/Button';

/**
 * Interface que define as propriedades aceitas pelo componente `CreateAnamneseView`.
 *
 * Este tipo de dados descreve as propriedades que podem ser passadas para o componente `CreateAnamneseView`.
 *
 * @interface CreateAnamneseViewProps
 */
export interface CreateAnamneseViewProps {
  initialValues: TCreateAnamnesisFormDTO;
  isSubmitting: boolean;
  onSubmit: (data: TCreateAnamnesisFormDTO) => Promise<void>;
  onReturnPage: () => void;
}

/**
 * Esse componente representa a view da página de exemplo.
 * @param props - As propriedades são definidas dentro do CreateAnamneseViewProps. E são encaminhadas para o componente dentro do CreateAnamneseController.
 * @returns Retorna o componente da view.
 */
export function CreateAnamneseView(props: CreateAnamneseViewProps) {
  const { initialValues, isSubmitting, onSubmit, onReturnPage } = props;

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h1 className="text-xl font-medium">Criando anamnese</h1>
        <small>Adicione as informações sobre a anamnese do paciente.</small>
      </div>

      <AnamnesisForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        isSubmitting={isSubmitting}
        formId="create-anamnesis"
      />

      <div className="mb-4 flex w-full flex-row-reverse items-center justify-end gap-2">
        <Button
          variant={'destructive'}
          disabled={isSubmitting}
          onClick={onReturnPage}
        >
          Voltar
        </Button>
        <Button type="submit" form="create-anamnesis" isLoading={isSubmitting}>
          Criar anamnese
        </Button>
      </div>
    </div>
  );
}
