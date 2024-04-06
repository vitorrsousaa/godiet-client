import { TPatient } from '@godiet-entities';
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

import { usePatientsHook } from './patients.hook';
import { PatientsView, PatientsViewProps } from './patients.view';

describe('PatientsPage', () => {
  let spy = {
    useGetAllPatients: {} as SpyInstance<
      Partial<ReturnType<(typeof PatientService)['useGetAllPatients']>>
    >,
    useDeletePatient: {} as SpyInstance<
      Partial<ReturnType<(typeof PatientService)['useDeletePatient']>>
    >,
  };

  afterEach(() => {
    clearAllMocks();
  });

  const patientsMock: TPatient[] = [
    {
      id: '1',
      name: 'John Doe',
      birthDate: new Date('1995-12-01').toDateString(),
      email: 'john@email.com',
      gender: 'MASC',
      height: 1.8,
      phone: '999999999',
      weight: 80,
      userId: '1',
    },
  ];

  beforeEach(() => {
    spy = {
      useGetAllPatients: spyOn(PatientService, 'useGetAllPatients'),
      useDeletePatient: spyOn(PatientService, 'useDeletePatient'),
    };

    spy.useGetAllPatients.mockReturnValue({
      patients: patientsMock,
    });
  });

  describe('View', () => {
    let rendered: ReturnRenderType;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    function renderPatientsView(props?: Partial<PatientsViewProps>) {
      const toggleModalDeletePatient = fn();
      const handleDeletePatient = fn();
      const onNavigateToPatientPage = fn();
      const toggleModalCreatePatient = fn();

      return render(
        <PatientsView
          isCreatePatientModalOpen={false}
          isDeletePatientModalOpen={false}
          isDeletingPatient={false}
          toggleModalDeletePatient={toggleModalDeletePatient}
          handleDeletePatient={handleDeletePatient}
          onNavigateToPatientPage={onNavigateToPatientPage}
          toggleModalCreatePatient={toggleModalCreatePatient}
          patients={patientsMock}
          {...props}
        />
      );
    }

    it('Should render the name of patient correctly', () => {
      // Arrange

      // Act
      rendered = renderPatientsView();

      // Assert
      expect(rendered.getByText('John Doe'));
    });
    it('Should call `onNavigateToPatientPage` when clicks on button to navigate', () => {
      // Arrange
      const onNavigateToPatientPage = fn();
      rendered = renderPatientsView({
        onNavigateToPatientPage,
      });

      // Act
      const button = rendered.getByLabelText('Ver mais');
      act(() => {
        fireEvent.click(button);
      });

      // Assert
      expect(onNavigateToPatientPage).toHaveBeenCalledWith(patientsMock[0].id);
    });
    it('Should call `toggleModalDeletePatient` when clicks on button to delete', () => {
      // Arrange
      const toggleModalDeletePatient = fn();
      rendered = renderPatientsView({
        toggleModalDeletePatient,
      });

      // Act
      const button = rendered.getByLabelText('Deletar paciente');
      act(() => {
        fireEvent.click(button);
      });

      // Assert
      expect(toggleModalDeletePatient).toHaveBeenCalled();
    });
  });

  describe('Hook', () => {
    let rendered: ReturnRenderHookType<typeof usePatientsHook>;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should return correct pageStatus when isLoadingPatients is true', () => {
      // Arrange
      spy.useGetAllPatients.mockReturnValue({
        isLoadingPatients: true,
        patients: [],
      });

      // Act
      rendered = renderHook(() => usePatientsHook());

      // Assert
      expect(rendered.result.current.pageStatus).toMatchObject({
        isLoading: true,
      });
    });
    it('Should return correct pageStatus when patients is empty', () => {
      // Arrange
      spy.useGetAllPatients.mockReturnValue({
        isLoadingPatients: true,
        patients: [],
      });

      // Act
      rendered = renderHook(() => usePatientsHook());

      // Assert
      expect(rendered.result.current.pageStatus).toMatchObject({
        noData: true,
      });
    });
    it('Should return correct pageStatus when isErrorPatients is true', () => {
      // Arrange
      spy.useGetAllPatients.mockReturnValue({
        isLoadingPatients: true,
        patients: [],
        isErrorPatients: true,
      });

      // Act
      rendered = renderHook(() => usePatientsHook());

      // Assert
      expect(rendered.result.current.pageStatus).toMatchObject({
        isError: true,
      });
    });
    it('Should not call deletePatient when selectPatientToDelete is undefined', () => {
      // Arrange
      const deletePatient = fn();
      spy.useDeletePatient.mockReturnValue({
        deletePatient,
      });

      // Act
      rendered = renderHook(() => usePatientsHook());
      act(() => {
        rendered.result.current.handleDeletePatient();
      });

      // Assert
      expect(deletePatient).not.toHaveBeenCalled();
    });
    it('Should call deletePatient when selectPatientToDelete is defined', async () => {
      // Arrange
      const deletePatient = fn();
      spy.useDeletePatient.mockReturnValue({
        deletePatient,
      });
      rendered = renderHook(() => usePatientsHook());

      // Act
      act(() => {
        rendered.result.current.toggleModalDeletePatient('1');
      });
      await act(async () => {
        await rendered.result.current.handleDeletePatient();
      });

      // Assert
      expect(deletePatient).toHaveBeenCalled();
    });
  });
});
