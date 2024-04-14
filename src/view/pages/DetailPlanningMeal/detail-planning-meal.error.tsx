import { useNavigate } from '@godiet-hooks/routes';
import { Button } from '@godiet-ui/Button';

/**
 * Componente de indicador de erro.
 *
 * Este componente é exibido quando ocorre um erro durante o carregamento dos dados na página.
 *
 * @returns Retorna o componente de indicador de erro.
 */
export function DetailPlanningMealError() {
  const { navigate } = useNavigate();

  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 text-center">
      <div>
        <p>Tivemos um erro para encontrar este plano alimentar!</p>
        <p>Por favor. Tente novamente mais tarde!</p>
      </div>
      <Button onClick={() => navigate('DASHBOARD')}>Página inicial</Button>
    </div>
  );
}
