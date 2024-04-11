import {
  render,
  renderHook,
  ReturnRenderHookType,
  ReturnRenderType,
} from '@testing-react';
import { clearAllMocks } from '@testing-suit';

import { useEnergyCalculationHook } from './energy-calculation.hook';
import { EnergyCalculationView } from './energy-calculation.view';

describe('EnergyCalculationPage', () => {
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
      rendered = render(<EnergyCalculationView data={0} />);

      // Assert
      expect(rendered.getByText('EnergyCalculation view'));
    });
  });

  describe('Hook', () => {
    let rendered: ReturnRenderHookType<typeof useEnergyCalculationHook>;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should render the hook with default props', () => {
      // Arrange

      // Act
      rendered = renderHook(() => useEnergyCalculationHook());

      // Assert
      expect(rendered.result.current.state).toEqual(0);
    });
  });
});
