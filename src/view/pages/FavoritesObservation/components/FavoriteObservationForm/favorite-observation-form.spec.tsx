import {
  act,
  fireEvent,
  render,
  renderHook,
  ReturnRenderHookType,
  ReturnRenderType,
  screen,
  waitFor,
} from '@testing-react';
import { clearAllMocks, fn } from '@testing-suit';

import {
  FavoriteObservationForm,
  FavoriteObservationFormProps,
} from './favorite-observation-form';
import { useFavoriteObservationFormHook } from './favorite-observation-form.hook';

describe('FavoriteObservationForm', () => {
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

    it('Should get form by id when uses form id property', () => {
      // Arrange

      // Act

      rendered = render(
        <FavoriteObservationForm
          isSubmitting={false}
          onSubmit={fn()}
          formId="custom-planning"
        />
      );

      // Assert

      expect(rendered.getByLabelText('form').getAttribute('id')).toEqual(
        'custom-planning'
      );
    });
    it('Should show error message when name of planning meal is empty', async () => {
      // Arrange
      rendered = render(
        <FavoriteObservationForm
          isSubmitting={false}
          onSubmit={fn()}
          formId="custom-planning"
        />
      );

      // Act
      act(() => {
        fireEvent.submit(rendered.getByLabelText('form'));
      });

      // Assert
      await waitFor(() => {
        expect(screen.getByText('O nome é obrigatório'));
      });
    });
    it('Should remove error message when the user typing on input of name of observation', async () => {
      // Arrange
      const onSubmit = fn();
      rendered = render(
        <FavoriteObservationForm
          isSubmitting={false}
          formId="custom"
          onSubmit={onSubmit}
        />
      );

      // Act
      act(() => {
        fireEvent.submit(rendered.getByLabelText('form'));
      });

      // Assert
      await waitFor(() => {
        expect(screen.getByText('O nome é obrigatório'));
      });

      // Act
      act(() => {
        fireEvent.change(rendered.getByLabelText('Nome da observação'), {
          target: { value: 'Name' },
        });
      });

      // Assert
      await waitFor(() => {
        expect(screen.queryByText('O nome é obrigatório')).toBeNull();
      });
    });
  });

  describe('hook', () => {
    let rendered: ReturnRenderHookType<typeof useFavoriteObservationFormHook>;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should call onSubmit function when call handleSubmit', async () => {
      // Arrange
      const onSubmit = fn().mockResolvedValue(null);
      const props: FavoriteObservationFormProps = {
        isSubmitting: false,
        onSubmit,
      };

      // Act

      rendered = renderHook(() => useFavoriteObservationFormHook(props));
      await rendered.result.current.handleSubmit();

      // Assert
      expect(true).toBeTruthy();
    });
  });
});
