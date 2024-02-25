import { Card } from '@godiet-ui/Card';
import { formatDate } from '@godiet-utils/formatDate';

interface CardMealHeaderProps {
  children: string;
  description: string;
}

export function Header(props: CardMealHeaderProps) {
  const { children, description } = props;
  return (
    <Card.Header>
      <Card.Title>{children}</Card.Title>
      <Card.Description>{formatDate(description, 'HH:mm')}</Card.Description>
    </Card.Header>
  );
}
