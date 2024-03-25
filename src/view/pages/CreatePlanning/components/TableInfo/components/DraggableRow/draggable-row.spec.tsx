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

    it('Should render correct drag and drop item', () => {
      // Arrange

      // Act

      rendered = render(<DraggableRow id="draggable-id" />);

      // Assert

      expect(rendered.getByText('DraggableRow'));
    });
    it('Should render correctlty children', () => {
      // Arrange

      // Act
      rendered = render(
        <DraggableRow id="draggable-id">
          <div>draggable-row</div>
        </DraggableRow>
      );

      // Assert

      expect(rendered.getByText('draggable-row'));
    });
  });
});
