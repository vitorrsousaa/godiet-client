import React from 'react';

interface CreateEnergyCalculationLayoutProps {
  children: React.ReactNode;
}

/**
 * Componente de layout para a página inteira.
 *
 * Este componente é responsável por fornecer um layout consistente para toda a página.
 * Qualquer conteúdo definido dentro deste componente será carregado para a página inteira,
 * independente do estado de carregamento, erro ou dados vazios da página.
 *
 * As propriedades que o layout recebe são encaminhadas no CreateEnergyCalculation.tsx
 *
 * @returns Retorna o componente de layout para a página inteira.
 */
export function CreateEnergyCalculationLayout(
  props: CreateEnergyCalculationLayoutProps
) {
  const { children } = props;

  return <>{children}</>;
}
