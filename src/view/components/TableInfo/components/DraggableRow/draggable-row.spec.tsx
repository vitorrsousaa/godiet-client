import { render, ReturnRenderType } from '@testing-react';
import { clearAllMocks } from '@testing-suit';

import { DraggableRow } from './draggable-row';

describe('DraggableRow', () => {
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

    it('Should render correctly children', () => {
      // Arrange

      // Act
      rendered = render(
        <DraggableRow id="draggable-id">
          <>draggable-row</>
        </DraggableRow>
      );

      // Assert

      expect(rendered.getByText('draggable-row'));
    });
  });
});
