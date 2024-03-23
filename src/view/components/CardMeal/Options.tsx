import { TMealFood } from '@godiet-entities';
import { cn } from '@godiet-utils/cn';

interface OptionsProps {
  mealFood: TMealFood;
  className?: string;
}

export function Options(props: OptionsProps) {
  const { mealFood, className } = props;

  return (
    <>
      <div className="flex flex-row justify-between gap-3">
        <div className="w-full">
          <small
            className={cn(
              'block rounded-md border-[1px] border-teal-600 bg-teal-300/5 p-2 text-center text-sm',
              className
            )}
          >
            {mealFood.name} - {mealFood.qty} {mealFood.measure.name}
          </small>
        </div>
        <div className="flex w-full flex-col gap-2">
          {/* {mealFood.options.map((option) => (
            <small
              key={option.id}
              className={cn(
                'block rounded-md border-[1px] border-teal-600 bg-teal-300/5 p-2 text-center text-sm',
                className
              )}
            >
              {option.name} - {option.baseQty} {option.baseUnit}
            </small>
          ))}  */}
        </div>
      </div>
      <hr />
    </>
  );
}
