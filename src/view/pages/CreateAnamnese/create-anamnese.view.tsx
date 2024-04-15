/**
 * Interface que define as propriedades aceitas pelo componente `CreateAnamneseView`.
 *
 * Este tipo de dados descreve as propriedades que podem ser passadas para o componente `CreateAnamneseView`.
 *
 * @interface CreateAnamneseViewProps
 */
export interface CreateAnamneseViewProps {
  data: number;
}

/**
 * Esse componente representa a view da página de exemplo.
 * @param props - As propriedades são definidas dentro do CreateAnamneseViewProps. E são encaminhadas para o componente dentro do CreateAnamneseController.
 * @returns Retorna o componente da view.
 */
export function CreateAnamneseView(props: CreateAnamneseViewProps) {
  const { data } = props;

  return (
    <div>
      <h1>CreateAnamnese view</h1>
      {data}
    </div>
  );
}
