import { CreateAnamneseEmpty } from './create-anamnese.empty';
import { CreateAnamneseError } from './create-anamnese.error';
import { CreateAnamneseHookOutput } from './create-anamnese.hook';
import { CreateAnamneseLoading } from './create-anamnese.loading';
import { CreateAnamneseView } from './create-anamnese.view';

/**
 * Componente que controla a lógica da página de exemplo.
 *
 * Este componente gerencia o estado da página de exemplo, lidando com casos de carregamento, erro e dados vazios.
 * Ele recebe como propriedade tudo que é retornado do useCreateAnamneseHook para obter os dados e o estado da página.
 *
 * As propriedades necessárias para renderizar a view são encaminhadas no controller. E devem ser definidas
 * dentro do componente de view.
 *
 * @returns Retorna o componente da página de exemplo.
 */
export function CreateAnamneseController(props: CreateAnamneseHookOutput) {
  const { pageStatus, state } = props;

  const { isError, isLoading, noData } = pageStatus;

  if (isLoading) {
    return <CreateAnamneseLoading />;
  }

  if (isError) {
    return <CreateAnamneseError />;
  }

  if (noData) {
    return <CreateAnamneseEmpty />;
  }

  return <CreateAnamneseView data={state} />;
}
