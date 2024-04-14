import { cn } from '@godiet-utils/cn';

interface ListHeaderProps {
  className?: string;
}

export function ListHeader(props: ListHeaderProps) {
  const { className } = props;
  return (
    <div
      className={cn(
        'w-full rounded-md border-[1px] border-teal-600 bg-teal-300/30 p-2 text-center text-sm font-medium md:text-lg',
        className
      )}
    >
      <h2>Opção principal</h2>
    </div>
  );
}
