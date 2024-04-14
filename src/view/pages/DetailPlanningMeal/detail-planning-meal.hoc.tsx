import React from 'react';

import { DetailPlanningMealProps } from './detail-planning-meal';
import { useDetailPlanningMealHook } from './detail-planning-meal.hook';

export function withHook(
  Component: React.ComponentType<DetailPlanningMealProps>
) {
  return function ComponentWithHook() {
    const hook = useDetailPlanningMealHook();

    return <Component {...hook} />;
  };
}
