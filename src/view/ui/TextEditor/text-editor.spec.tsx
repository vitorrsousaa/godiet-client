import { render, ReturnRenderType } from '@testing-react';
import { clearAllMocks, fn } from '@testing-suit';
import { afterEach } from 'vitest';

import { TextEditor } from './text-editor';

describe('TextEditor', () => {
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

    it('Should render error correctly when error is defined', () => {
      // Arrange

      // Act
      rendered = render(
        <TextEditor value="initial" onChange={fn()} error="error" />
      );

      // Assert
      expect(rendered.getByText('error'));
    });
  });
});
