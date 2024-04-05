import { useCallback } from 'react';

import { usePatient } from '@godiet-hooks/patient';
import { useGeneratePDF } from '@godiet-hooks/pdf';
import { useGetByPlanningId } from '@godiet-hooks/planningMeal';
import { useNavigate } from '@godiet-hooks/routes';

import { useParams } from 'react-router-dom';

export function useDetailsPlanningMealHook() {
  const { planningId } = useParams<{ id: string; planningId: string }>();

  const { isErrorPatient, isFetchingPatient, patient } = usePatient();

  const { isErrorPlanningMeal, isFetchingPlanningMeal, planningMeal } =
    useGetByPlanningId({
      patientId: patient?.id,
      planningId,
    });

  const { exportElementRef, isGeneratingPDF, generatePDF } = useGeneratePDF();

  const { navigate } = useNavigate();

  const handleNavigateToHomePage = useCallback(() => {
    navigate('DASHBOARD');
  }, [navigate]);

  const handleExportPDF = useCallback(() => {
    generatePDF(planningMeal?.name ?? '');
  }, [generatePDF, planningMeal]);

  return {
    patient,
    isErrorPatient,
    isFetchingPatient,
    isFetchingPlanningMeal,
    planningMeal,
    isErrorPlanningMeal,
    isGeneratingPDF,
    exportElementRef,
    handleNavigateToHomePage,
    handleExportPDF,
  };
}
