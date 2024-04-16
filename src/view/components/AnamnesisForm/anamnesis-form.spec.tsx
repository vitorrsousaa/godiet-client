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

import { AnamnesisForm, AnamnesisFormProps } from './anamnesis-form';
import { useAnamnesisFormHook } from './anamnesis-form.hook';

describe('AnamnesisForm', () => {
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

    function renderAnamnesis(props: Partial<AnamnesisFormProps> = {}) {
      return render(
        <AnamnesisForm isSubmitting={false} onSubmit={fn()} {...props} />
      );
    }

    it('Should get form by id when uses form id property', () => {
      // Arrange

      // Act

      rendered = renderAnamnesis({ formId: 'custom-id' });

      // Assert

      expect(rendered.getByLabelText('form').getAttribute('id')).toEqual(
        'custom-id'
      );
    });

    it('Should show error message when try submit form and the name of anamnese is empty', async () => {
      // Arrange
      rendered = renderAnamnesis();

      // Act
      act(() => {
        fireEvent.submit(rendered.getByLabelText('form'));
      });

      // Assert
      await waitFor(() => {
        expect(screen.getByText('O título é obrigatório'));
      });
    });

    it('Should show error message when trye submit form and the the text of anamnese is empty', async () => {
      // Arrange
      rendered = renderAnamnesis();

      // Act
      act(() => {
        fireEvent.submit(rendered.getByLabelText('form'));
      });

      // Assert
      await waitFor(() => {
        expect(screen.getByText('O texto é obrigatório'));
      });
    });

    it('Should remove error message when the user typing on input of name of anamnesis', async () => {
      // Arrange
      rendered = renderAnamnesis();

      // Act
      act(() => {
        fireEvent.submit(rendered.getByLabelText('form'));
      });

      // Assert
      await waitFor(() => {
        expect(screen.getByText('O título é obrigatório'));
      });

      // Act
      act(() => {
        fireEvent.change(rendered.getByLabelText('Nome da anamnese'), {
          target: { value: 'Name' },
        });
      });

      // Assert
      await waitFor(() => {
        expect(screen.queryByText('O título é obrigatório')).toBeNull();
      });
    });

    // it('Should remove error message when the user typing on input of text of anmanese', async () => {
    //   // Arrange
    //   rendered = renderAnamnesis();

    //   // Act
    //   act(() => {
    //     fireEvent.submit(rendered.getByLabelText('form'));
    //   });

    //   // Assert
    //   await waitFor(() => {
    //     expect(screen.getByText('O texto é obrigatório'));
    //   });

    //   // Act
    //   act(() => {
    //     const containerTextEditor = screen.getByLabelText('text-editor');
    //     // Add texting
    //     // containerTextEditor.firstChild?.appendChild(<p>Text</p>);
    //     screen.debug(containerTextEditor?.childNodes[0]);
    //     // fireEvent.change(rendered.getByLabelText('Texto da anamnese'), {
    //     //   target: { value: 'Name' },
    //     // });
    //   });

    //   // Assert
    //   await waitFor(() => {
    //     expect(screen.queryByText('O texto é obrigatório')).toBeNull();
    //   });
    // });
  });

  describe('hook', () => {
    let rendered: ReturnRenderHookType<typeof useAnamnesisFormHook>;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should render the hook with default props', async () => {
      // Arrange
      const onSubmit = fn();
      const props: AnamnesisFormProps = {
        onSubmit,
      };

      // Act
      rendered = renderHook(() => useAnamnesisFormHook(props));
      await act(async () => {
        await rendered.result.current.handleSubmit();
      });

      // Assert

      expect(true).toBeTruthy();
    });
  });
});
