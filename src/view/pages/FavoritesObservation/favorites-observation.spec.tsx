import { TFavoritesObservation } from '@godiet-entities';
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

  const favoritesObservationsMock: TFavoritesObservation[] = [
    {
      createdAt: '2021-10-10',
      id: '1',
      text: 'Observation 1',
      title: 'Title 1',
      userId: '1',
    },
    {
      createdAt: '2021-10-10',
      id: '2',
      text: 'Observation 2',
      title: 'Title 2',
      userId: '2',
    },
  ];

  describe('View', () => {
    let rendered: ReturnRenderType;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should render all favoriteObservations when observations is defined', () => {
      // Arrange

      // Act
      rendered = render(
        <FavoritesObservationView observations={favoritesObservationsMock} />
      );

      // Assert
      expect(rendered.getByText('Title 1'));
      expect(rendered.getByText('Title 2'));
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
