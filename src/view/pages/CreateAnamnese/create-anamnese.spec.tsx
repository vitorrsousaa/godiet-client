import {
  render,
  renderHook,
  ReturnRenderHookType,
  ReturnRenderType,
} from '@testing-react';
import { clearAllMocks } from '@testing-suit';

import { useCreateAnamneseHook } from './create-anamnese.hook';
import { CreateAnamneseView } from './create-anamnese.view';

describe('CreateAnamnesePage', () => {
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
      rendered = render(<CreateAnamneseView data={0} />);

      // Assert
      expect(rendered.getByText('CreateAnamnese view'));
    });
  });

  describe('Hook', () => {
    let rendered: ReturnRenderHookType<typeof useCreateAnamneseHook>;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should render the hook with default props', () => {
      // Arrange

      // Act
      rendered = renderHook(() => useCreateAnamneseHook());

      // Assert
      expect(rendered.result.current.state).toEqual(0);
    });
  });
});
