import { TFavoritesObservation } from '@godiet-entities';
import { Button } from '@godiet-ui/Button';
import { Card } from '@godiet-ui/Card';
import { DangerModal } from '@godiet-ui/DangerModal';
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
  modalDeleteFavoriteIsOpen: boolean;
  isDeletingFavoritesObservation?: boolean;
  toggleModalDeleteFavorite: (id: string | null) => void;
  onDeleteFavoriteObservation: () => Promise<void>;
}

/**
 * Esse componente representa a view da página de exemplo.
 * @param props - As propriedades são definidas dentro do FavoritesObservationViewProps. E são encaminhadas para o componente dentro do FavoritesObservationController.
 * @returns Retorna o componente da view.
 */
export function FavoritesObservationView(props: FavoritesObservationViewProps) {
  const {
    observations,
    modalDeleteFavoriteIsOpen,
    isDeletingFavoritesObservation,
    toggleModalDeleteFavorite,
    onDeleteFavoriteObservation,
  } = props;

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
              <Button
                variant={'destructive'}
                className="h-8 px-2"
                onClick={() => toggleModalDeleteFavorite(observation.id)}
                aria-label={`Deletar observação ${observation.title}`}
              >
                <TrashIcon />
              </Button>
            </div>
          </Card.Header>
        </Card.Root>
      ))}

      <DangerModal
        isOpen={modalDeleteFavoriteIsOpen}
        description="Você tem certeza que deseja deletar esta observação favorita? Esta ação não pode ser desfeita!"
        onClose={() => toggleModalDeleteFavorite(null)}
        onConfirm={onDeleteFavoriteObservation}
        title="Deletar uma observação favorita"
        isLoading={isDeletingFavoritesObservation}
      />
    </>
  );
}
