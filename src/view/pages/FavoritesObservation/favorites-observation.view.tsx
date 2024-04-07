import { TFavoritesObservation } from '@godiet-entities';
import { Button } from '@godiet-ui/Button';
import { Card } from '@godiet-ui/Card';
import { formatDate } from '@godiet-utils/formatDate';

import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';

/**
 * Interface que define as propriedades aceitas pelo componente `FavoritesObservationView`.
 *
 * Este tipo de dados descreve as propriedades que podem ser passadas para o componente `FavoritesObservationView`.
 *
 * @interface FavoritesObservationViewProps
 */
export interface FavoritesObservationViewProps {
  observations: TFavoritesObservation[];
}

/**
 * Esse componente representa a view da página de exemplo.
 * @param props - As propriedades são definidas dentro do FavoritesObservationViewProps. E são encaminhadas para o componente dentro do FavoritesObservationController.
 * @returns Retorna o componente da view.
 */
export function FavoritesObservationView(props: FavoritesObservationViewProps) {
  const { observations } = props;

  return (
    <>
      {observations.map((observation) => (
        <Card.Root key={observation.id}>
          <Card.Header className="sm:flex-row">
            <div className="w-full">
              <Card.Title>{observation.title}</Card.Title>
              <Card.Description>
                {formatDate(observation.createdAt.toString(), 'PP')}
              </Card.Description>
            </div>
            <div className="flex flex-row items-center space-x-1">
              <Button className="h-8 px-2">
                <Pencil2Icon />
              </Button>
              <Button variant={'destructive'} className="h-8 px-2">
                <TrashIcon />
              </Button>
            </div>
          </Card.Header>
        </Card.Root>
      ))}
    </>
  );
}
