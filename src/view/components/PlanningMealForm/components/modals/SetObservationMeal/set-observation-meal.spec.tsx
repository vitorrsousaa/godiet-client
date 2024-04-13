import * as FavoriteService from '@godiet-hooks/favoritesObservation';

import { render, ReturnRenderType } from '@testing-react';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@testing-suit';

import { SetObservationMeal } from './set-observation-meal';

describe('SetObservationMeal', () => {
  beforeEach(() => {
    clearAllMocks();
  });

  describe('render', () => {
    let rendered: ReturnRenderType;
    let spy = {
      useGetAllFavoritesObservation: {} as SpyInstance<
        Partial<
          ReturnType<(typeof FavoriteService)['useGetAllFavoritesObservation']>
        >
      >,
    };

    beforeEach(() => {
      spy = {
        useGetAllFavoritesObservation: spyOn(
          FavoriteService,
          'useGetAllFavoritesObservation'
        ),
      };

      spy.useGetAllFavoritesObservation.mockReturnValue({
        favoritesObservations: [],
      });
    });

    afterEach(() => {
      clearAllMocks();
      rendered.unmount();
    });

    it('Should render the view with default props', () => {
      // Arrange

      // Act
      rendered = render(
        <SetObservationMeal isOpen mealIndex={1} onClose={fn()} />
      );

      // Assert
      expect(rendered.getByText('Adicionando uma observação alimentar'));
    });
  });
});
