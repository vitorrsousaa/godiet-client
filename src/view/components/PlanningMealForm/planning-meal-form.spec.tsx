import * as FavoriteService from '@godiet-hooks/favoriteMeal';
import * as FoodService from '@godiet-hooks/foods';

import {
  act,
  fireEvent,
  render,
  renderHook,
  ReturnRenderHookType,
  ReturnRenderType,
  screen,
  waitFor,
} from '@testing-react';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@testing-suit';

import { foodsMock } from './mocks/food';
import { PlanningMealForm, PlanningMealFormProps } from './planning-meal-form';
import { usePlanningMealFormHook } from './planning-meal-form.hook';
import { TCreatePlanningMealDTO } from './planning-meal-form.schema';

describe('PlanningMealForm', () => {
  let spy = {
    useGetAllFoods: {} as SpyInstance<
      Partial<ReturnType<(typeof FoodService)['useGetAllFoods']>>
    >,
    useGetAllFavoriteMeal: {} as SpyInstance<
      Partial<ReturnType<(typeof FavoriteService)['useGetAllFavoriteMeal']>>
    >,
  };

  beforeEach(() => {
    spy = {
      useGetAllFoods: spyOn(FoodService, 'useGetAllFoods'),
      useGetAllFavoriteMeal: spyOn(FavoriteService, 'useGetAllFavoriteMeal'),
    };

    spy.useGetAllFoods.mockReturnValue({
      foods: foodsMock,
    });

    spy.useGetAllFavoriteMeal.mockReturnValue({
      favoriteMeals: [
        {
          id: '1',
          name: 'favorite meal',
          mealFoods: [],
        },
      ],
    });
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

    const defaultInitialValues: TCreatePlanningMealDTO = {
      name: 'Default plano alimentar',
      meals: [
        {
          name: '',
          mealFoods: [],
          time: '',
        },
      ],
    };

    it('Should render input for change the name of planning meal', () => {
      // Arrange
      const onSubmit = fn();

      // Act
      rendered = render(<PlanningMealForm onSubmit={onSubmit} />);

      // Assert
      expect(rendered.getByLabelText('Nome do plano alimentar'));
    });

    it('Should render the name of planning meal when use initialValues', () => {
      // Arrange
      const onSubmit = fn();
      // Act
      rendered = render(
        <PlanningMealForm
          initialValues={defaultInitialValues}
          onSubmit={onSubmit}
        />
      );

      // Assert
      expect(rendered.getByDisplayValue('Default plano alimentar'));
    });

    it('Should get form by id when uses form id property', () => {
      // Arrange
      const onSubmit = fn();
      // Act
      rendered = render(
        <PlanningMealForm formID="custom-planning" onSubmit={onSubmit} />
      );

      // Assert
      expect(rendered.getByLabelText('form').getAttribute('id')).toEqual(
        'custom-planning'
      );
    });
    it('Should show error message when name of planning meal is empty', async () => {
      // Arrange
      const onSubmit = fn();
      rendered = render(<PlanningMealForm onSubmit={onSubmit} />);

      // Act
      act(() => {
        fireEvent.submit(rendered.getByLabelText('form'));
      });

      // Assert
      await waitFor(() => {
        expect(screen.getByText('O nome do plano alimentar é obrigatório.'));
      });
    });
    it('Should remove error message when the user typing on input of name of planning meal', async () => {
      // Arrange
      const onSubmit = fn();
      rendered = render(<PlanningMealForm onSubmit={onSubmit} />);

      // Act
      act(() => {
        fireEvent.submit(rendered.getByLabelText('form'));
      });

      // Assert
      await waitFor(() => {
        expect(screen.getByText('O nome do plano alimentar é obrigatório.'));
      });

      // Act
      act(() => {
        fireEvent.change(rendered.getByLabelText('Nome do plano alimentar'), {
          target: { value: 'Name of planning' },
        });
      });

      // Assert
      await waitFor(() => {
        expect(
          screen.queryByText('O nome do plano alimentar é obrigatório.')
        ).toBeNull();
      });
    });
  });

  describe('hook', () => {
    let rendered: ReturnRenderHookType<typeof usePlanningMealFormHook>;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should return default formId when the formId property is undefined', () => {
      // Arrange
      const onSubmit = fn();
      const props: PlanningMealFormProps = {
        // data: 'teste',
        onSubmit,
      };

      // Act
      rendered = renderHook(() => usePlanningMealFormHook(props));

      // Assert
      expect(rendered.result.current.formId).toEqual('planning-meal-form');
    });

    it('Should return custom formId when the formId property is custom', () => {
      const onSubmit = fn();
      // Arrange
      const props: PlanningMealFormProps = {
        // data: 'teste',
        formID: 'custom-form-id',
        onSubmit,
      };

      // Act
      rendered = renderHook(() => usePlanningMealFormHook(props));

      // Assert
      expect(rendered.result.current.formId).toEqual('custom-form-id');
    });

    it('Should return empty meal when the initialValues is empty', () => {
      const onSubmit = fn();
      // Arrange
      const props: PlanningMealFormProps = {
        // data: 'teste',
        onSubmit,
      };

      // Act
      rendered = renderHook(() => usePlanningMealFormHook(props));

      // Assert
      expect(rendered.result.current.meals).toMatchObject([
        {
          name: '',
          time: '',
          mealFoods: [],
        },
      ]);
    });

    it('Should return correct meal when the initialValues is valid', () => {
      // Arrange
      const onSubmit = fn();

      const props: PlanningMealFormProps = {
        // data: 'teste',
        onSubmit,
        initialValues: {
          name: 'Default plano alimentar',
          meals: [
            {
              name: 'meal_01',
              mealFoods: [],
              time: '',
            },
          ],
        },
      };

      // Act
      rendered = renderHook(() => usePlanningMealFormHook(props));

      // Assert
      expect(rendered.result.current.meals).toMatchObject([
        {
          name: 'meal_01',
          time: '',
          mealFoods: [],
        },
      ]);
    });
    it('Should add new meal empty when call the handleAddNewMeal ', () => {
      // Arrange
      const onSubmit = fn();
      const props: PlanningMealFormProps = { onSubmit };

      rendered = renderHook(() => usePlanningMealFormHook(props));

      // Act
      act(() => {
        rendered.result.current.handleAddNewMeal();
      });

      // Assert
      expect(rendered.result.current.meals[1]).toMatchObject({
        name: '',
        time: '',
        mealFoods: [],
      });
    });
    it('Should add new meal empty when call the handleAddNewMeal and not uses initialValues', () => {
      const onSubmit = fn();
      // Arrange
      const props: PlanningMealFormProps = { onSubmit };
      rendered = renderHook(() => usePlanningMealFormHook(props));

      // Act
      act(() => {
        rendered.result.current.handleAddNewMeal();
      });

      // Assert
      expect(rendered.result.current.meals.length).toBe(2);
    });
    it('Should add new meal empty when call the handleAddNewMeal function when uses initialValues', () => {
      const onSubmit = fn();
      // Arrange
      const props: PlanningMealFormProps = {
        // data: 'teste',
        onSubmit,
        initialValues: {
          name: 'Default plano alimentar',
          meals: [
            {
              name: 'meal_01',
              mealFoods: [],
              time: '',
            },
          ],
        },
      };
      rendered = renderHook(() => usePlanningMealFormHook(props));

      // Act
      act(() => {
        rendered.result.current.handleAddNewMeal();
      });

      // Assert
      expect(rendered.result.current.meals.length).toBe(2);
    });
    it('Should add new meal when call the appendMeals function ', () => {
      const onSubmit = fn();
      // Arrange
      const props: PlanningMealFormProps = { onSubmit };
      rendered = renderHook(() => usePlanningMealFormHook(props));

      // Act
      act(() => {
        rendered.result.current.appendMeals({
          name: 'append',
          time: '',
          mealFoods: [],
        });
      });

      // Assert
      expect(rendered.result.current.meals.length).toBe(2);
      expect(rendered.result.current.meals[1]).toMatchObject({
        name: 'append',
        time: '',
        mealFoods: [],
      });
    });
    it('Should not remove meal when call function handleRemoveMeal but exists just one meal', () => {
      const onSubmit = fn();
      // Arrange
      const props: PlanningMealFormProps = { onSubmit };
      rendered = renderHook(() => usePlanningMealFormHook(props));

      // Act
      act(() => {
        rendered.result.current.handleRemoveMeal(0);
      });

      // Assert
      expect(rendered.result.current.meals.length).toBe(1);
    });
    it('Should remove meal when call function handleRemoveMeal', () => {
      const onSubmit = fn();
      // Arrange
      const props: PlanningMealFormProps = { onSubmit };
      rendered = renderHook(() => usePlanningMealFormHook(props));

      // Act
      act(() => {
        rendered.result.current.handleAddNewMeal();
      });
      // Assert
      expect(rendered.result.current.meals.length).toBe(2);

      // Act
      act(() => {
        rendered.result.current.handleRemoveMeal(0);
      });
      // Assert
      expect(rendered.result.current.meals.length).toBe(1);
    });
    it('Should remove meal when call function handleRemoveMeal and uses initialValues', () => {
      const onSubmit = fn();
      // Arrange
      const props: PlanningMealFormProps = {
        onSubmit,
        initialValues: {
          name: 'planning',
          meals: [
            {
              time: '',
              name: '01',
              mealFoods: [],
            },
            {
              time: '',
              name: '02',
              mealFoods: [],
            },
          ],
        },
      };
      rendered = renderHook(() => usePlanningMealFormHook(props));

      // Assert
      expect(rendered.result.current.meals.length).toBe(2);

      // Act
      act(() => {
        rendered.result.current.handleRemoveMeal(0);
      });
      // Assert
      expect(rendered.result.current.meals.length).toBe(1);
    });
  });
});
