import warning from '@godiet-assets/warning.svg';

export function PlanningMealError() {
  return (
    <div className="flex flex-col items-center gap-2 text-center ">
      <img src={warning} alt="warning" className="w-24" />
      <p>Tivemos um erro para encontrar o plano alimentar deste paciente.</p>
      <p>Por favor, tente novamente!</p>
    </div>
  );
}
