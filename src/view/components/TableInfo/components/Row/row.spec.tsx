import { act, fireEvent, render, ReturnRenderType } from '@testing-react';
import { clearAllMocks, fn } from '@testing-suit';

import { Row, RowProps } from './row';

describe('Row', () => {
  beforeEach(() => {
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

    const defaultProps: RowProps = {
      mealFood: {
        carb: '0',
        energy: '9',
        fat: '5',
        measure: { name: 'name', qty: 6 },
        id: 'any_id',
        name: 'Meal food 01',
        prot: '3',
        qty: 2,
      },
      children: null,
    };

    it('should renders the name of the food when not editable', () => {
      // Arrange

      // Act
      rendered = render(<Row {...defaultProps} />);

      // Assert
      expect(rendered.getByText('Meal food 01'));
    });

    it('should renders the name of the food when not editable', () => {
      // Arrange
      const onChange = fn();
      const props: RowProps = {
        ...defaultProps,
        onChangeEditable: onChange,
        editable: true,
      };
      rendered = render(<Row {...props} />);

      // Act
      const input = rendered.getByDisplayValue('Meal food 01');
      act(() => {
        fireEvent.change(input, { target: { value: 'new value' } });
      });

      // Assert
      expect(onChange).toBeCalled();
    });
    it('should renders children correctly', () => {
      // Arrange
      const props: RowProps = {
        ...defaultProps,
        children: <>children</>,
      };

      // Act
      rendered = render(<Row {...props} />);

      // Assert
      expect(rendered.getByText('children'));
    });
  });
});
