import * as FavoritesService from '@godiet-hooks/favoritesObservation';

import {
  render,
  renderHook,
  ReturnRenderHookType,
  ReturnRenderType,
} from '@testing-react';
import { clearAllMocks, SpyInstance, spyOn } from '@testing-suit';

import { useFavoritesObservationHook } from './favorites-observation.hook';
import { FavoritesObservationView } from './favorites-observation.view';

describe('FavoritesObservationPage', () => {
  let spy = {
    useGetAllFavoritesObservation: {} as SpyInstance<
      Partial<
        ReturnType<(typeof FavoritesService)['useGetAllFavoritesObservation']>
      >
    >,
  };
  beforeEach(() => {
    spy = {
      useGetAllFavoritesObservation: spyOn(
        FavoritesService,
        'useGetAllFavoritesObservation'
      ),
    };
  });

  afterEach(() => {
    clearAllMocks();
  });

  describe('View', () => {
    let rendered: ReturnRenderType;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should render the view with default props', () => {
      // Arrange

      // Act
      rendered = render(<FavoritesObservationView data={0} />);

      // Assert
      expect(true).toBeTruthy();
    });
  });

  describe('Hook', () => {
    let rendered: ReturnRenderHookType<typeof useFavoritesObservationHook>;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should return correct pageStatus when isLoadingPatients is true', () => {
      // Arrange
      spy.useGetAllFavoritesObservation.mockReturnValue({
        favoritesObservations: [],
        isLoadingFavoritesObservation: true,
      });

      // Act
      rendered = renderHook(() => useFavoritesObservationHook());

      // Assert
      expect(rendered.result.current.pageStatus).toMatchObject({
        isLoading: true,
      });
    });
    it('Should return correct pageStatus when favorites observation is empty', () => {
      // Arrange
      spy.useGetAllFavoritesObservation.mockReturnValue({
        favoritesObservations: [],
        isLoadingFavoritesObservation: true,
      });

      // Act
      rendered = renderHook(() => useFavoritesObservationHook());

      // Assert
      expect(rendered.result.current.pageStatus).toMatchObject({
        noData: true,
      });
    });
    it('Should return correct pageStatus when isErrorFavoritesObservation is true', () => {
      // Arrange
      spy.useGetAllFavoritesObservation.mockReturnValue({
        favoritesObservations: [],
        isLoadingFavoritesObservation: false,
        isErrorFavoritesObservation: true,
      });

      // Act
      rendered = renderHook(() => useFavoritesObservationHook());

      // Assert
      expect(rendered.result.current.pageStatus).toMatchObject({
        isError: true,
      });
    });
  });
});
