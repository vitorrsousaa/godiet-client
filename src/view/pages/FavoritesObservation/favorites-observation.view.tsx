/**
 * Interface que define as propriedades aceitas pelo componente `FavoritesObservationView`.
 *
 * Este tipo de dados descreve as propriedades que podem ser passadas para o componente `FavoritesObservationView`.
 *
 * @interface FavoritesObservationViewProps
 */
export interface FavoritesObservationViewProps {
  data: number;
}

/**
 * Esse componente representa a view da página de exemplo.
 * @param props - As propriedades são definidas dentro do FavoritesObservationViewProps. E são encaminhadas para o componente dentro do FavoritesObservationController.
 * @returns Retorna o componente da view.
 */
export function FavoritesObservationView(props: FavoritesObservationViewProps) {
  const { data } = props;

  return <>{data}</>;
}
