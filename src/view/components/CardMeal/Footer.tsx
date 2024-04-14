import { Card } from '@godiet-ui/Card';
import { Separator } from '@godiet-ui/Separator';

import ReactHtmlParser from 'react-html-parser';

interface CardMealFooterProps {
  children: string;
}

export function Footer(props: CardMealFooterProps) {
  const { children } = props;
  return (
    <Card.Footer className="flex flex-col">
      <Separator className="mb-2 mt-2" />
      {ReactHtmlParser(children)}
    </Card.Footer>
  );
}
