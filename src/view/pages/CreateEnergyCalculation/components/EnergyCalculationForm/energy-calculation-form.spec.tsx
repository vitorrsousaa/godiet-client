import {
  render,
  renderHook,
  ReturnRenderHookType,
  ReturnRenderType,
} from '@testing-react';
import { clearAllMocks } from '@testing-suit';

import {
  EnergyCalculationForm,
  EnergyCalculationFormProps,
} from './energy-calculation-form';
import { useEnergyCalculationFormHook } from './energy-calculation-form.hook';

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
      rendered.unmount();
    });

    it('Should render the view with default props', () => {
      // Arrange

      // Act
      rendered = render(<EnergyCalculationForm data={'0'} />);

      // Assert
      expect(rendered.getByText('EnergyCalculationForm'));
    });
  });

  describe('hook', () => {
    let rendered: ReturnRenderHookType<typeof useEnergyCalculationFormHook>;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should render the hook with default props', () => {
      // Arrange
      const props: EnergyCalculationFormProps = {
        data: 'teste',
      };

      // Act
      rendered = renderHook(() => useEnergyCalculationFormHook(props));

      // Assert
      expect(rendered.result.current.state).toEqual('teste');
    });
  });
});
