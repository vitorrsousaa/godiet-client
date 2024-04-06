import warning from '@godiet-assets/warning.svg';

/**
 * Componente de indicador de erro.
 *
 * Este componente é exibido quando ocorre um erro durante o carregamento dos dados na página.
 *
 * @returns Retorna o componente de indicador de erro.
 */
export function PatientsError() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <img src={warning} alt="warning" className="w-24" />
      <p>Tivemos um erro para buscar seus pacientes.</p>
      <p>Por favor, tente novamente!</p>
    </div>
  );
}
