import { render, ReturnRenderType } from '@testing-react';
import { clearAllMocks, fn } from '@testing-suit';

import { SetObservationMeal } from './set-observation-meal';

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
      rendered = render(
        <SetObservationMeal isOpen mealIndex={1} onClose={fn()} />
      );

      // Assert
      expect(rendered.getByText('Adicionando uma observação alimentar'));
    });
  });
});
