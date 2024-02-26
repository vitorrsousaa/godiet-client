import { useCallback } from 'react';

import { useGetByPatientId } from '@godiet-hooks/patient';
import { useGetByPlanningId } from '@godiet-hooks/planningMeal';
import { useNavigate } from '@godiet-hooks/routes';
import { Avatar } from '@godiet-ui/Avatar';
import { Button } from '@godiet-ui/Button';
import { Separator } from '@godiet-ui/Separator';
import { Spinner } from '@godiet-ui/Spinner';
import { formatDate } from '@godiet-utils/formatDate';

import {
  CalendarIcon,
  InfoCircledIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { useParams } from 'react-router-dom';

export function DetailsPlanningMeal() {
  const { id, planningId } = useParams<{ id: string; planningId: string }>();

  const { isErrorPatient, isFetchingPatient, patient } = useGetByPatientId(id);

  const { isErrorPlanningMeal, isFetchingPlanningMeal, planningMeal } =
    useGetByPlanningId({
      patientId: patient?.id,
      planningId,
    });

  const { navigate } = useNavigate();

  const handleNavigateToHomePage = useCallback(() => {
    navigate('HOME');
  }, [navigate]);

  return (
    <>
      {isFetchingPatient ? (
        <div className="grid h-full w-full place-items-center">
          <Spinner className="h-12 w-12" />
        </div>
      ) : (
        <>
          {isErrorPatient || !patient ? (
            <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 text-center">
              <div>
                <p>Tivemos um erro para encontrar este paciente!</p>
                <p>Por favor. Tente novamente mais tarde!</p>
              </div>
              <Button onClick={handleNavigateToHomePage}>Página inicial</Button>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-semibold">Paciente</h1>
                </div>
                <div className="flex items-center gap-4 ">
                  <Avatar name={patient.name} />
                  <div className="flex flex-col">
                    <span className="flex items-center gap-1">
                      <PersonIcon /> {patient.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <InfoCircledIcon /> {patient.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarIcon />
                      {formatDate(patient.birthDate, 'PPP')}
                    </span>
                  </div>
                </div>
                <Separator />
              </div>
              <div className="my-8 ">
                <h2 className="text-md font-semibold">
                  Planejamento alimentar
                </h2>
                {isFetchingPlanningMeal ? (
                  <div className="mt-16 grid h-full w-full place-items-center">
                    <Spinner />
                  </div>
                ) : (
                  <>
                    {isErrorPlanningMeal || !planningMeal ? (
                      <div>
                        <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 text-center">
                          <div>
                            <p>
                              Tivemos um erro para encontrar este plano
                              alimentar!
                            </p>
                            <p>Por favor. Tente novamente mais tarde!</p>
                          </div>
                          <Button onClick={handleNavigateToHomePage}>
                            Página inicial
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h4>{planningMeal.name}</h4>
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
