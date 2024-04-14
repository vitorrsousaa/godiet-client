import {
  render,
  renderHook,
  ReturnRenderHookType,
  ReturnRenderType,
} from '@testing-react';
import { clearAllMocks } from '@testing-suit';

import { useDetailPlanningMealHook } from './detail-planning-meal.hook';
import { DetailPlanningMealView } from './detail-planning-meal.view';

describe('DetailPlanningMealPage', () => {
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
      rendered = render(<DetailPlanningMealView data={0} />);

      // Assert
      expect(rendered.getByText('DetailPlanningMeal view'));
    });
  });

  describe('Hook', () => {
    let rendered: ReturnRenderHookType<typeof useDetailPlanningMealHook>;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should render the hook with default props', () => {
      // Arrange

      // Act
      rendered = renderHook(() => useDetailPlanningMealHook());

      // Assert
      expect(rendered.result.current.state).toEqual(0);
    });
  });
});
