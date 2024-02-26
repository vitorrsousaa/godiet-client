import { ReactNode } from 'react';

import { Card } from '@godiet-ui/Card';

interface ContentProps {
  children: ReactNode;
}

export function Content(props: ContentProps) {
  const { children } = props;

  return (
    <Card.Content className="flex flex-col gap-4">{children}</Card.Content>
  );
}
