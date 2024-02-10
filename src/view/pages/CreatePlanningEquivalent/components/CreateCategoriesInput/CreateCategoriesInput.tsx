import { memo } from 'react';

import { SimpleInput } from '@godiet-components/SimpleInput';

import { Category, TooltipCategory } from '../TooltipCategory';

import { useCreateCategoriesInputHook } from './CreateCategoriesInput.hook';

interface CreateCategoriesInputProps {
  mealIndex: number;
  categoryIndex: number;
  category: Category;
}

const CreateCategoriesInput = memo((props: CreateCategoriesInputProps) => {
  const { categoryIndex, mealIndex, category } = props;
  const categoryId = props.category.id;

  const { prefetchFoods, register } = useCreateCategoriesInputHook();

  return (
    <div className="flex flex-col items-center gap-2">
      <TooltipCategory category={category} />

      <SimpleInput
        min={0}
        placeholder="0"
        {...register(`meals.${mealIndex}.categories.${categoryIndex}.qty`)}
        onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
          prefetchFoods({
            categoryId: categoryId,
            portion: parseFloat(event.target.value),
          });
        }}
      />

      <input
        type="hidden"
        {...register(`meals.${mealIndex}.categories.${categoryIndex}.id`)}
        value={categoryId}
      />
    </div>
  );
});

CreateCategoriesInput.displayName = 'CreateCategoriesInput';

export default CreateCategoriesInput;
