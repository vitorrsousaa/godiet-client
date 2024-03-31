import { FoodsByMeal } from '@godiet-utils/foods';

import {
  act,
  fireEvent,
  render,
  renderHook,
  ReturnRenderHookType,
  ReturnRenderType,
} from '@testing-react';
import { clearAllMocks, fn } from '@testing-suit';

import { TableInfo } from './table-info';
import { useTableInfoHook } from './table-info.hook';
import { TableInfoProps } from './table-info.types';

describe('TableInfo', () => {
  beforeEach(() => {
    clearAllMocks();
  });

  const defaultMealFoods: FoodsByMeal[] = [
    {
      carb: '0',
      energy: '9',
      fat: '5',
      measure: { name: 'name', qty: 6 },
      id: 'any_id',
      name: 'Meal food 01',
      prot: '3',
      qty: 2,
    },
    {
      carb: '0',
      energy: '9',
      fat: '5',
      measure: { name: 'name', qty: 6 },
      id: 'any_id_2',
      name: 'Meal food 02',
      prot: '3',
      qty: 2,
    },
  ];

  const defaultProps: TableInfoProps = {
    mealFoods: defaultMealFoods,
    mealIndex: 1,
  };

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

      // Act
      rendered = render(<TableInfo {...defaultProps} />);

      // Assert
      expect(rendered.getByText('Ações'));
    });

    it('Should call onOpenModalRemove function when clicks on edit button', () => {
      // Arrange
      const onOpenModalRemove = fn();

      rendered = render(
        <TableInfo {...defaultProps} onOpenModalRemove={onOpenModalRemove} />
      );

      const removeButton = rendered.getAllByTestId('remove-food-button');

      // Act
      act(() => {
        fireEvent.click(removeButton[0]);
      });

      // Assert
      expect(onOpenModalRemove).toBeCalled();
    });

    it('Should call onOpenModalEdit function when clicks on edit button', () => {
      // Arrange
      const onOpenModalEdit = fn();

      rendered = render(
        <TableInfo {...defaultProps} onOpenModalEdit={onOpenModalEdit} />
      );

      const editButton = rendered.getAllByTestId('edit-food-button');

      // Act
      act(() => {
        fireEvent.click(editButton[0]);
      });

      // Assert
      expect(onOpenModalEdit).toBeCalled();
    });

    it('Should remove actions when disableActions is true', () => {
      // Arrange

      // Act
      rendered = render(<TableInfo {...defaultProps} disabledActions={true} />);

      // Assert
      expect(rendered.queryByText('Ações')).toBeNull();
    });

    it('Should not render footer when meal foods is empty', () => {
      // Arrange

      // Act
      rendered = render(<TableInfo {...defaultProps} mealFoods={[]} />);

      // Assert
      expect(rendered.queryByText('Total')).toBeNull();
    });

    it('Should  render footer when meal foods exists', () => {
      // Arrange

      // Act
      rendered = render(<TableInfo {...defaultProps} />);

      // Assert
      expect(rendered.queryByText('Total'));
    });
  });

  describe('hook', () => {
    let rendered: ReturnRenderHookType<typeof useTableInfoHook>;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    describe('total foods', () => {
      it('Should return the total foods', () => {
        // Arrange
        const props: TableInfoProps = {
          ...defaultProps,
        };

        // Act
        rendered = renderHook(() => useTableInfoHook(props));

        // Assert
        expect(rendered.result.current.totalFoods).toEqual([
          { attribute: 'qty', value: '24.00' },
          { attribute: 'prot', value: '6.00' },
          { attribute: 'carb', value: '0.00' },
          { attribute: 'fat', value: '10.00' },
          { attribute: 'energy', value: '18.00' },
        ]);
      });

      it('Should return the total foods with empty mealFoods', () => {
        // Arrange
        const props: TableInfoProps = {
          ...defaultProps,
          mealFoods: [],
        };

        // Act
        rendered = renderHook(() => useTableInfoHook(props));

        // Assert
        expect(rendered.result.current.totalFoods).toEqual([]);
      });
    });

    describe('meal foods with custom id', () => {
      it('Should return the meal foods with custom id', () => {
        // Arrange
        const props: TableInfoProps = {
          ...defaultProps,
        };

        // Act
        rendered = renderHook(() => useTableInfoHook(props));

        // Assert
        expect(rendered.result.current.mealFoodsWithCustomId).toEqual([
          {
            carb: '0',
            energy: '9',
            fat: '5',
            measure: { name: 'name', qty: 6 },
            id: 'any_id-0',
            name: 'Meal food 01',
            prot: '3',
            qty: 2,
          },
          {
            carb: '0',
            energy: '9',
            fat: '5',
            measure: { name: 'name', qty: 6 },
            id: 'any_id_2-1',
            name: 'Meal food 02',
            prot: '3',
            qty: 2,
          },
        ]);
      });
    });

    describe('handle change input editable', () => {
      it('should', () => {
        expect(true).toBeTruthy();
      });
    });
  });
});
