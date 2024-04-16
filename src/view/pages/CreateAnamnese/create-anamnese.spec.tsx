import { TPatient } from '@godiet-entities';
import * as AnamnesisService from '@godiet-hooks/anamnesis';
import * as PatientService from '@godiet-hooks/patient';

import {
  act,
  fireEvent,
  render,
  renderHook,
  ReturnRenderHookType,
  ReturnRenderType,
} from '@testing-react';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@testing-suit';

import { useCreateAnamneseHook } from './create-anamnese.hook';
import {
  CreateAnamneseView,
  CreateAnamneseViewProps,
} from './create-anamnese.view';

describe('CreateAnamnesePage', () => {
  let spy = {
    useCreateAnamnesis: {} as SpyInstance<
      ReturnType<(typeof AnamnesisService)['useCreateAnamnesis']>
    >,
    usePatient: {} as SpyInstance<
      ReturnType<(typeof PatientService)['usePatient']>
    >,
  };

  beforeEach(() => {
    spy = {
      useCreateAnamnesis: spyOn(AnamnesisService, 'useCreateAnamnesis'),
      usePatient: spyOn(PatientService, 'usePatient'),
    };
  });

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

    function renderCreateAnamnese(
      props: Partial<CreateAnamneseViewProps> = {}
    ) {
      return render(
        <CreateAnamneseView
          isSubmitting={false}
          onReturnPage={fn()}
          onSubmit={fn()}
          initialValues={{ text: '', title: '' }}
          {...props}
        />
      );
    }

    // it('Should render with correct initial text when text is defined', () => {
    //   // Arrange

    //   // Act
    //   rendered = renderCreateAnamnese({
    //     initialValues: {
    //       text: 'initial-text',
    //       title: 'initial-title',
    //     },
    //   });

    //   // Assert
    //   expect(rendered.getByDisplayValue('initial-text'));
    // });

    it('Should render with correct initial title when title is defined', () => {
      // Arrange

      // Act
      rendered = renderCreateAnamnese({
        initialValues: {
          text: 'initial-text',
          title: 'initial-title',
        },
      });

      // Assert
      expect(rendered.getByDisplayValue('initial-title'));
    });

    it('Should call `onReturnPage` when clicks on "Voltar" button and `onReturnPage` is defined', () => {
      // Arrange
      const onReturnPage = fn();
      rendered = renderCreateAnamnese({
        onReturnPage,
      });

      // Act
      act(() => {
        fireEvent.click(rendered.getByText('Voltar'));
      });

      // Assert
      expect(onReturnPage).toHaveBeenCalled();
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

    it('Should call `createAnamnesis` when call handleSubmit', async () => {
      // Arrange
      const createAnamnesis = fn();
      spy.useCreateAnamnesis.mockReturnValue({
        createAnamnesis,
      });
      rendered = renderHook(() => useCreateAnamneseHook());

      // Act
      await act(async () => {
        await rendered.result.current.handleSubmit({
          text: 'text',
          title: 'title',
        });
      });

      // Assert
      expect(createAnamnesis).toHaveBeenCalled();
    });
    it('Should call `createAnamnesis` with correct parameters when call handleSubmit', async () => {
      // Arrange
      const patientId = 'patientId';
      const anamnesis = {
        title: 'title',
        text: 'text',
      };
      const createAnamnesis = fn();
      spy.useCreateAnamnesis.mockReturnValue({
        createAnamnesis,
      });
      spy.usePatient.mockReturnValue({
        patient: {
          id: patientId,
        } as unknown as TPatient,
      });
      rendered = renderHook(() => useCreateAnamneseHook());

      // Act
      await act(async () => {
        await rendered.result.current.handleSubmit(anamnesis);
      });

      // Assert
      expect(createAnamnesis).toHaveBeenCalledWith({
        anamnesis,
        patientId,
      });
    });
  });
});
