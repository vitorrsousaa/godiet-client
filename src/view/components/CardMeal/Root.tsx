import { ReactNode } from 'react';

import { Card } from '@godiet-ui/Card';

interface CardRootProps {
  children: ReactNode;
}

export function Root(props: CardRootProps) {
  const { children } = props;

  return <Card.Root>{children}</Card.Root>;
}
