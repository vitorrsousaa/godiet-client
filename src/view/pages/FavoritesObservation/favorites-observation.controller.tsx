import { FavoritesObservationEmpty } from './favorites-observation.empty';
import { FavoritesObservationError } from './favorites-observation.error';
import { FavoritesObservationHookOutput } from './favorites-observation.hook';
import { FavoritesObservationLoading } from './favorites-observation.loading';
import { FavoritesObservationView } from './favorites-observation.view';

/**
 * Componente que controla a lógica da página de exemplo.
 *
 * Este componente gerencia o estado da página de exemplo, lidando com casos de carregamento, erro e dados vazios.
 * Ele recebe como propriedade tudo que é retornado do useFavoritesObservationHook para obter os dados e o estado da página.
 *
 * As propriedades necessárias para renderizar a view são encaminhadas no controller. E devem ser definidas
 * dentro do componente de view.
 *
 * @returns Retorna o componente da página de exemplo.
 */
export function FavoritesObservationController(
  props: FavoritesObservationHookOutput
) {
  const { pageStatus, favoritesObservations } = props;

  const { isError, isLoading, noData } = pageStatus;

  if (isLoading) {
    return <FavoritesObservationLoading />;
  }

  if (isError) {
    return <FavoritesObservationError />;
  }

  if (noData) {
    return <FavoritesObservationEmpty />;
  }

  return <FavoritesObservationView observations={favoritesObservations} />;
}
