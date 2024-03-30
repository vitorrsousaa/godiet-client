import {
  render,
  renderHook,
  ReturnRenderHookType,
  ReturnRenderType,
} from '@testing-react';
import { clearAllMocks } from '@testing-suit';

import { useEditPlanningMealHook } from './edit-planning-meal.hook';
import { EditPlanningMealView } from './edit-planning-meal.view';

describe('EditPlanningMealPage', () => {
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
      rendered = render(<EditPlanningMealView data={0} />);

      // Assert
      expect(rendered.getByText('EditPlanningMeal view'));
    });
  });

  describe('Hook', () => {
    let rendered: ReturnRenderHookType<typeof useEditPlanningMealHook>;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should render the hook with default props', () => {
      // Arrange

      // Act
      rendered = renderHook(() => useEditPlanningMealHook());

      // Assert
      expect(rendered.result.current.state).toEqual(0);
    });
  });
});
