import React from 'react';

import { Button } from '@godiet-ui/Button';

interface EnergyCalculationLayoutProps {
  children: React.ReactNode;
}

/**
 * Componente de layout para a página inteira.
 *
 * Este componente é responsável por fornecer um layout consistente para toda a página.
 * Qualquer conteúdo definido dentro deste componente será carregado para a página inteira,
 * independente do estado de carregamento, erro ou dados vazios da página.
 *
 * As propriedades que o layout recebe são encaminhadas no EnergyCalculation.tsx
 *
 * @returns Retorna o componente de layout para a página inteira.
 */
export function EnergyCalculationLayout(props: EnergyCalculationLayoutProps) {
  const { children } = props;

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-lg font-semibold ">Cálculo energético</h1>
        <Button>Criar novo</Button>
      </div>
      {children}
    </div>
  );
}
