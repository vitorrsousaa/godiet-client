import { HeaderSettings } from '@godiet-components/HeaderSettings';
import { Button } from '@godiet-ui/Button';
import { DangerModal } from '@godiet-ui/DangerModal';
import { Input } from '@godiet-ui/Input';
import { Spinner } from '@godiet-ui/Spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@godiet-ui/Table';

import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';

import { ModalCreateFavoriteMeal } from './components/modals/ModalCreateFavoriteMeal';
import { useFavoritesMealsHook } from './FavoritesMeals.hook';

export function FavoritesMeals() {
  const {
    favoritesMeals,
    isLoadingFavoriteMeal,
    isFetchingFavoritesMeals,
    isErrorFavoriteMeal,
    modalCreateFavoriteMealIsOpen,
    modalDeleteFavoriteMealIsOpen,
    isDeletingFavoriteMeal,
    toggleModalCreateFavoriteMeal,
    handleOpenModalToDeleteFavoriteMeal,
    handleCloseModalToDeleteFavoriteMeal,
    handleDeleteFavoriteMeal,
  } = useFavoritesMealsHook();

  return (
    <>
      <HeaderSettings
        title="Refeições"
        extra={
          <Button
            isLoading={isFetchingFavoritesMeals}
            onClick={toggleModalCreateFavoriteMeal}
          >
            Criar
          </Button>
        }
      >
        Aqui você pode criar/editar suas refeições favoritas que serão
        utilizadas durante a construção do planejamento alimentar do paciente.
        Você também pode criar novas refeições favoritas durante a elaboração do
        plano alimentar.
      </HeaderSettings>
      <div className="h-full w-full">
        {isLoadingFavoriteMeal ? (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner />
          </div>
        ) : isErrorFavoriteMeal ? (
          <div className="flex h-full w-full flex-col items-center justify-center text-center [&>strong]:text-red-600">
            <strong>Ops! Algo deu errado para carregar as refeições!</strong>
            <p>Por favor, reinicie a página e tente novamente.</p>
          </div>
        ) : (
          <>
            {favoritesMeals.length > 0 ? (
              <>
                <Input name="favorite" placeholder="Nome da refeição" />
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="">
                        Nome da refeição favorita
                      </TableHead>
                      <TableHead className="hidden min-[430px]:table-cell">
                        Calorias
                      </TableHead>

                      <TableHead className="flex  items-center justify-center">
                        Ações
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {favoritesMeals.map((favorite, index) => {
                      const { id, name, energy } = favorite;
                      return (
                        <TableRow key={`favorite-${id}-${index}`}>
                          <TableCell className="text-[12px]">{name}</TableCell>

                          <TableCell className="hidden text-[12px] min-[430px]:table-cell">
                            {energy} Kcal
                          </TableCell>
                          <TableCell>
                            <span className="flex w-full flex-row items-center justify-center gap-1">
                              <Button
                                variant={'outline'}
                                className="h-6 px-1 transition-colors hover:bg-gray-300 "
                              >
                                <Pencil1Icon />
                              </Button>
                              <Button
                                variant={'outline'}
                                className="h-6 px-1 transition-colors hover:bg-red-400 "
                                onClick={() =>
                                  handleOpenModalToDeleteFavoriteMeal(id)
                                }
                              >
                                <TrashIcon />
                              </Button>
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </>
            ) : (
              <div>
                <small>
                  Você ainda não cadastrou nenhuma refeição favorita.
                </small>
              </div>
            )}
          </>
        )}
      </div>

      <DangerModal
        title="Deletar uma refeição favorita"
        isOpen={modalDeleteFavoriteMealIsOpen}
        onClose={handleCloseModalToDeleteFavoriteMeal}
        description="Você tem certeza que deseja deletar esta refeição favorita? Esta ação não pode ser desfeita!"
        onConfirm={handleDeleteFavoriteMeal}
        isLoading={isDeletingFavoriteMeal}
      />

      <ModalCreateFavoriteMeal
        isOpen={modalCreateFavoriteMealIsOpen}
        onClose={toggleModalCreateFavoriteMeal}
      />
    </>
  );
}
