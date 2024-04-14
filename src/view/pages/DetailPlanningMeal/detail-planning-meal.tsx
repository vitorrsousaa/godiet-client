import { DetailPlanningMealController } from './detail-planning-meal.controller';
import { withHook } from './detail-planning-meal.hoc';
import { DetailPlanningMealHookOutput } from './detail-planning-meal.hook';
import { DetailPlanningMealLayout } from './detail-planning-meal.layout';

export type DetailPlanningMealProps = DetailPlanningMealHookOutput;

function DetailPlanningMealWithoutHook(props: DetailPlanningMealProps) {
  return (
    <DetailPlanningMealLayout>
      <DetailPlanningMealController {...props} />
    </DetailPlanningMealLayout>
  );
}

const DetailPlanningMeal = withHook(DetailPlanningMealWithoutHook);

export { DetailPlanningMeal };
