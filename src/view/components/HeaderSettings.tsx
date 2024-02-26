import { Separator } from '@godiet-ui/Separator';

interface HeaderSettingsProps {
  title: string;
  children: string;
  extra?: React.ReactNode;
}

export function HeaderSettings(props: HeaderSettingsProps) {
  const { title, children, extra } = props;

  return (
    <>
      <header className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center lg:gap-12">
        <div className="flex flex-col">
          <h1 className="text-lg font-medium">{title}</h1>

          <small className="hidden font-medium text-gray-500 sm:block">
            {children}
          </small>
        </div>

        {extra && extra}
      </header>
      <Separator />
    </>
  );
}
