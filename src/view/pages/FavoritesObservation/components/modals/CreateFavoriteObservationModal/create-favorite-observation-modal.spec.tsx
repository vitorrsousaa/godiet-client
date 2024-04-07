import * as FavoritesService from '@godiet-hooks/favoritesObservation';

import {
  act,
  render,
  renderHook,
  ReturnRenderHookType,
  ReturnRenderType,
} from '@testing-react';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@testing-suit';

import {
  CreateFavoriteObservationModal,
  CreateFavoriteObservationModalProps,
} from './create-favorite-observation-modal';
import { useCreateFavoriteObservationModalHook } from './create-favorite-observation-modal.hook';

describe('CreateFavoriteObservationModal', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let spy = {
    useCreateFavoritesObservation: {} as SpyInstance<
      Partial<
        ReturnType<(typeof FavoritesService)['useCreateFavoritesObservation']>
      >
    >,
  };

  beforeEach(() => {
    spy = {
      useCreateFavoritesObservation: spyOn(
        FavoritesService,
        'useCreateFavoritesObservation'
      ),
    };
  });

  afterEach(() => {
    clearAllMocks();
  });

  describe('render', () => {
    let rendered: ReturnRenderType;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should render the view with default props', () => {
      // Arrange
      const onClose = fn();
      // Act
      rendered = render(
        <CreateFavoriteObservationModal isOpen={true} onClose={onClose} />
      );

      // Assert
      expect(rendered.getByText('Criar uma nova observação favorita'));
    });
  });

  describe('hook', () => {
    let rendered: ReturnRenderHookType<
      typeof useCreateFavoriteObservationModalHook
    >;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });
    it('Should call onClose when call handleCloseModal', () => {
      // Arrange
      const onClose = fn();
      const props: CreateFavoriteObservationModalProps = {
        isOpen: true,
        onClose,
      };

      // Act
      rendered = renderHook(() => useCreateFavoriteObservationModalHook(props));
      act(() => {
        rendered.result.current.handleCloseModal();
      });

      // Assert
      expect(onClose).toHaveBeenCalled();
    });
    it('Should call create', async () => {
      // Arrange
      const createFavoritesObservation = fn();
      const onClose = fn();
      const props: CreateFavoriteObservationModalProps = {
        isOpen: true,
        onClose,
      };
      spy.useCreateFavoritesObservation.mockReturnValue({
        createFavoritesObservation,
      });

      // Act
      rendered = renderHook(() => useCreateFavoriteObservationModalHook(props));
      await act(async () => {
        await rendered.result.current.handleSubmit({
          text: 'text',
          title: 'title',
        });
      });

      // Assert
      expect(createFavoritesObservation).toHaveBeenCalled();
    });
  });
});
