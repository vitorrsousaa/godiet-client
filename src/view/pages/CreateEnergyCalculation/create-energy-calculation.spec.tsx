import {
  render,
  renderHook,
  ReturnRenderHookType,
  ReturnRenderType,
} from '@testing-react';
import { clearAllMocks } from '@testing-suit';

import { useCreateEnergyCalculationHook } from './create-energy-calculation.hook';
import { CreateEnergyCalculationView } from './create-energy-calculation.view';

describe('CreateEnergyCalculationPage', () => {
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
      rendered = render(<CreateEnergyCalculationView data={0} />);

      // Assert
      expect(rendered.getByText('CreateEnergyCalculation view'));
    });
  });

  describe('Hook', () => {
    let rendered: ReturnRenderHookType<typeof useCreateEnergyCalculationHook>;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should render the hook with default props', () => {
      // Arrange

      // Act
      rendered = renderHook(() => useCreateEnergyCalculationHook());

      // Assert
      expect(rendered.result.current.state).toEqual(0);
    });
  });
});
