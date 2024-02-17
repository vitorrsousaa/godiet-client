import { cn } from '@godiet-utils/cn';

interface BubbleMenuButtonProps {
  onAction: () => void;
  isActive: boolean;
  children: React.ReactNode;
}

export function BubbleMenuButton(props: BubbleMenuButtonProps) {
  const { onAction, children, isActive } = props;

  return (
    <button
      onClick={onAction}
      className={cn(
        'flex items-center justify-center gap-4 p-2 leading-none hover:bg-primary/70 [&+button]:border-l-[1px]',
        isActive && 'bg-primary text-white'
      )}
      type="button"
    >
      {children}
    </button>
  );
}
