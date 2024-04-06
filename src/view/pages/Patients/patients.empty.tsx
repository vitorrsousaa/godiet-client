import noData from '@godiet-assets/no_data.svg';

/**
 * Componente de indicador de dados vazios.
 *
 * Este componente é exibido quando não há dados disponíveis para serem mostrados na página.
 *
 * @returns Retorna o componente de indicador de dados vazios.
 */
export function PatientsEmpty() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <img src={noData} alt="no-data" className="w-20" />
      <div className="text-center">
        <h1 className="text-center text-xl font-medium sm:text-2xl">
          Nenhum paciente cadastrado
        </h1>
        <small className="tracking-wide text-gray-500">
          Cadastre um paciente para acompanhar por aqui.
        </small>
      </div>
    </div>
  );
}
