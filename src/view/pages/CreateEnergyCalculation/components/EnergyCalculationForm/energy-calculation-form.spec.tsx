import { ReturnRenderType } from '@testing-react';
import { clearAllMocks } from '@testing-suit';

describe('EnergyCalculationForm', () => {
  beforeEach(() => {
    clearAllMocks();
  });

  describe('render', () => {
    let rendered: ReturnRenderType;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered?.unmount();
    });

    it('Should render the view with default props', () => {
      // Arrange

      // Act

      // Assert
      expect(true).toBeTruthy();
    });
  });
});
