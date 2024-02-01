import { categoryMap } from './categories/iconsMap';

interface CategoryIconProps {
  category: string;
}

export function CategoryIcon({ category }: CategoryIconProps) {
  const Icon = categoryMap[category as keyof typeof categoryMap];

  return <Icon />;
}
