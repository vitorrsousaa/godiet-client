
import {
  render,
  renderHook,
  ReturnRenderHookType,
  ReturnRenderType,
} from '@testing-react';
import { clearAllMocks } from '@testing-suit';

import { CreateFavoriteObservationModal, CreateFavoriteObservationModalProps } from './create-favorite-observation-modal';
import { useCreateFavoriteObservationModalHook } from './create-favorite-observation-modal.hook';

describe('CreateFavoriteObservationModal', () => {
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
      rendered = render(<CreateFavoriteObservationModal data={'0'} />);

      // Assert
      expect(rendered.getByText('CreateFavoriteObservationModal'));
    });
  });

  describe('hook', () => {
    let rendered: ReturnRenderHookType<typeof useCreateFavoriteObservationModalHook>;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should render the hook with default props', () => {
      // Arrange
      const props: CreateFavoriteObservationModalProps = {
        data: 'teste',
      };

      // Act
      rendered = renderHook(() => useCreateFavoriteObservationModalHook(props));

      // Assert
      expect(rendered.result.current.state).toEqual('teste');
    });
  });
});
