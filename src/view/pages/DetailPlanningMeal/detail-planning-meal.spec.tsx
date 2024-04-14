import { TPlanningMeal } from '@godiet-entities';
import * as PatientService from '@godiet-hooks/patient';
import * as PlanningMealService from '@godiet-hooks/planningMeal';

import {
  act,
  fireEvent,
  render,
  renderHook,
  ReturnRenderHookType,
  ReturnRenderType,
} from '@testing-react';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@testing-suit';

import { useDetailPlanningMealHook } from './detail-planning-meal.hook';
import {
  DetailPlanningMealView,
  DetailPlanningMealViewProps,
} from './detail-planning-meal.view';

describe('DetailPlanningMealPage', () => {
  let spy = {
    usePatient: {} as SpyInstance<
      ReturnType<(typeof PatientService)['usePatient']>
    >,
    useGetByPlanningId: {} as SpyInstance<
      ReturnType<(typeof PlanningMealService)['useGetByPlanningId']>
    >,
  };

  beforeEach(() => {
    spy = {
      usePatient: spyOn(PatientService, 'usePatient'),
      useGetByPlanningId: spyOn(PlanningMealService, 'useGetByPlanningId'),
    };

    spy.usePatient.mockReturnValue({
      isErrorPatient: false,
      isFetchingPatient: false,
    });

    spy.useGetByPlanningId.mockReturnValue({
      isErrorPlanningMeal: false,
      isFetchingPlanningMeal: false,
    });
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

    function renderDetailPlanningMealView(
      props: Partial<DetailPlanningMealViewProps> = {}
    ) {
      return render(
        <DetailPlanningMealView
          name="a"
          onGeneratePDF={fn}
          meals={[]}
          exportElementRef={{ current: null }}
          {...props}
        />
      );
    }

    it('Should render with correct name when name is defined', () => {
      // Arrange
      const name = 'Testing';

      // Act
      rendered = renderDetailPlanningMealView({ name });

      // Assert
      expect(rendered.getByText(name));
    });

    it('Should call onGeneratePDF when clicks on button to get pdf', () => {
      // Arrange
      const onGeneratePDF = fn();
      rendered = renderDetailPlanningMealView({ onGeneratePDF });

      // Act
      act(() => {
        fireEvent.click(rendered.getByLabelText('Baixar PDF'));
      });

      // Assert
      expect(onGeneratePDF).toHaveBeenCalled();
    });
  });

  describe('Hook', () => {
    let rendered: ReturnRenderHookType<typeof useDetailPlanningMealHook>;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should return planning meal with the correct return of hook', () => {
      // Arrange
      const date = new Date();
      const planningMeal: TPlanningMeal = {
        name: 'Testing',
        createdAt: date.toString(),
        meals: [],
        patientId: '1',
        id: '1',
      };
      spy.useGetByPlanningId.mockReturnValue({ planningMeal });

      // Act
      rendered = renderHook(() => useDetailPlanningMealHook());

      // Assert
      expect(rendered.result.current.planningMeal).toEqual(planningMeal);
    });
  });
});
