import { memo } from 'react';

import { CategoryIcon } from '@godiet-ui/icons/CategoryIcon';
import { Tooltip } from '@godiet-ui/Tooltip';

import { TCategoryName } from 'src/app/entities/CategoryName';

export interface Category
  extends Omit<
    TCategoryName,
    'baseProtein' | 'baseFat' | 'baseCarbo' | 'baseEnergy'
  > {
  baseProtein: string;
  baseFat: string;
  baseCarbo: string;
  baseEnergy: string;
}

interface TooltipCategoryProps {
  category: Category;
}

function TooltipCategoryComponent({ category }: TooltipCategoryProps) {
  return (
    <Tooltip
      content={
        <div className="flex flex-col">
          <strong className="text-lg">{category.name}</strong>
          <p>Proteínas: {category.baseProtein} g/porção</p>
          <p>Lipídios: {category.baseFat} g/porção</p>
          <p>
            Carboidratos: {category.baseCarbo}
            g/porção
          </p>
          <p>
            Calorias: {category.baseEnergy}
            kcal/porção
          </p>
        </div>
      }
    >
      <CategoryIcon category={category.name} />
    </Tooltip>
  );
}

const TooltipCategory = memo(TooltipCategoryComponent);

export { TooltipCategory };
