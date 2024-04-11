import React from 'react';

import { HeaderSettings } from '@godiet-components/HeaderSettings';
import { Button } from '@godiet-ui/Button';

import { CreateFavoriteObservationModal } from './components/modals/CreateFavoriteObservationModal';

interface FavoritesObservationLayoutProps {
  children: React.ReactNode;
  isFetching?: boolean;
  modalCreateFavoriteIsOpen: boolean;
  toggleModalCreateFavorite: () => void;
}

/**
 * Componente de layout para a página inteira.
 *
 * Este componente é responsável por fornecer um layout consistente para toda a página.
 * Qualquer conteúdo definido dentro deste componente será carregado para a página inteira,
 * independente do estado de carregamento, erro ou dados vazios da página.
 *
 * As propriedades que o layout recebe são encaminhadas no FavoritesObservation.tsx
 *
 * @returns Retorna o componente de layout para a página inteira.
 */
export function FavoritesObservationLayout(
  props: FavoritesObservationLayoutProps
) {
  const {
    children,
    isFetching,
    modalCreateFavoriteIsOpen,
    toggleModalCreateFavorite,
  } = props;

  return (
    <div className="flex flex-col gap-3">
      <HeaderSettings
        title="Observações"
        extra={
          <Button isLoading={isFetching} onClick={toggleModalCreateFavorite}>
            Criar
          </Button>
        }
      >
        Aqui você pode criar/editar suas observações favoritas que serão
        utilizadas durante a construção do planejamento alimentar do paciente.
        Você também pode criar novas observações favoritas durante a elaboração
        do plano alimentar.
      </HeaderSettings>
      {children}

      <CreateFavoriteObservationModal
        isOpen={modalCreateFavoriteIsOpen}
        onClose={toggleModalCreateFavorite}
      />
    </div>
  );
}
