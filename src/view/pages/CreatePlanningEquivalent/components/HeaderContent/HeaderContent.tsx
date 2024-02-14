import { memo } from 'react';

import { Button } from '@godiet-ui/Button';
import { Input } from '@godiet-ui/Input';

import { useHeaderContentHook } from './HeaderContent.hook';

interface HeaderContentProps {
  mealIndex: number;
}

function HeaderContentComponent(props: HeaderContentProps) {
  const { mealIndex } = props;
  const { errors, register } = useHeaderContentHook();

  return (
    <div className="mb-5 flex flex-col items-start justify-between gap-2 sm:flex-row sm:gap-8">
      <div className="w-full">
        <Input
          placeholder="Nome da refeição"
          className="w-full"
          {...register(`meals.${mealIndex}.name`)}
          error={errors.meals?.[mealIndex]?.name?.message}
        />
      </div>
      <div className="w-full">
        <Input
          placeholder="Horário"
          type="time"
          className="w-full"
          {...register(`meals.${mealIndex}.time`)}
          error={errors.meals?.[mealIndex]?.time?.message}
        />
      </div>
      <Button variant="outline" className="">
        0 Kcal
      </Button>
    </div>
  );
}

const HeaderContent = memo(HeaderContentComponent);

export { HeaderContent };
