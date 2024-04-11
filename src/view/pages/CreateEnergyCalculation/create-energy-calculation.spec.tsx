import { render, ReturnRenderType } from '@testing-react';
import { clearAllMocks, fn } from '@testing-suit';

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
      rendered = render(<CreateEnergyCalculationView onSubmit={fn()} />);

      // Assert
      expect(rendered.getByText('Estimativa de gasto energético'));
    });
  });

  // describe('Hook', () => {
  //   let rendered: ReturnRenderHookType<typeof useCreateEnergyCalculationHook>;

  //   beforeEach(() => {
  //     clearAllMocks();
  //   });

  //   afterEach(() => {
  //     rendered.unmount();
  //   });

  //   it('Should render the hook with default props', () => {
  //     // Arrange

  //     // Act
  //     rendered = renderHook(() => useCreateEnergyCalculationHook());

  //     // Assert
  //     expect(rendered.result.current.state).toEqual(0);
  //   });
  // });
});
