import {
  render,
  renderHook,
  ReturnRenderHookType,
  ReturnRenderType,
} from '@testing-react';
import { clearAllMocks } from '@testing-suit';

import {
  SetObservationMeal,
  SetObservationMealProps,
} from './set-observation-meal';
import { useSetObservationMealHook } from './set-observation-meal.hook';

describe('SetObservationMeal', () => {
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

    it('Should render the view with default props', () => {
      // Arrange

      // Act
      rendered = render(<SetObservationMeal data={'0'} />);

      // Assert
      expect(rendered.getByText('SetObservationMeal'));
    });
  });

  describe('hook', () => {
    let rendered: ReturnRenderHookType<typeof useSetObservationMealHook>;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should render the hook with default props', () => {
      // Arrange
      const props: SetObservationMealProps = {
        data: 'teste',
      };

      // Act
      rendered = renderHook(() => useSetObservationMealHook(props));

      // Assert
      expect(rendered.result.current.state).toEqual('teste');
    });
  });
});
