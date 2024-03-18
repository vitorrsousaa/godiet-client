import { TFood, TMeasure } from '@godiet-entities';

interface CalculateMealFoodsParams {
  food: TFood;
  measure: TMeasure;
  qty: number;
}

export interface FoodsByMeal {
  id: string;
  measure: { name: string; qty: number };
  qty: number;
  prot: string;
  fat: string;
  carb: string;
  energy: string;
  name: string;
}

export function calculateMealFoods(
  params: CalculateMealFoodsParams
): FoodsByMeal {
  const { food, measure, qty } = params;

  const { attributes, baseQty } = food;

  const proteinAttributeOriginal = attributes.find(
    (attribute) => attribute.name === 'protein'
  );
  const carbAttributeOriginal = attributes.find(
    (attribute) => attribute.name === 'carbohydrate'
  );
  const fatAttributeOriginal = attributes.find(
    (attribute) => attribute.name === 'lipid'
  );
  const energyAttributeOriginal = attributes.find(
    (attribute) => attribute.name === 'energy'
  );

  const proteinAttribute = proteinAttributeOriginal
    ? ((proteinAttributeOriginal.qty * measure.qty) / baseQty) * qty
    : 0;

  const carbAttribute = carbAttributeOriginal
    ? ((carbAttributeOriginal.qty * measure.qty) / baseQty) * qty
    : 0;

  const fatAttribute = fatAttributeOriginal
    ? ((fatAttributeOriginal.qty * measure.qty) / baseQty) * qty
    : 0;

  const energyAttribute = energyAttributeOriginal
    ? ((energyAttributeOriginal.qty * measure.qty) / baseQty) * qty
    : 0;

  return {
    id: food.id,
    measure: measure,
    qty: qty,
    prot: proteinAttribute.toFixed(2),
    fat: fatAttribute.toFixed(2),
    carb: carbAttribute.toFixed(2),
    energy: energyAttribute.toFixed(2),
    name: food.name,
  };
}
