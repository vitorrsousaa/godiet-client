import React from 'react';

interface EditPlanningMealLayoutProps {
  children: React.ReactNode;
}

/**
 * Componente de layout para a página inteira.
 *
 * Este componente é responsável por fornecer um layout consistente para toda a página.
 * Qualquer conteúdo definido dentro deste componente será carregado para a página inteira,
 * independente do estado de carregamento, erro ou dados vazios da página.
 *
 * @returns Retorna o componente de layout para a página inteira.
 */
export function EditPlanningMealLayout(props: EditPlanningMealLayoutProps) {
  const { children } = props;

  return (
    <div>
      EditPlanningMeal layout
      {children}
    </div>
  );
}
