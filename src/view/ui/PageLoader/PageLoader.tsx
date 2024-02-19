import { Logo } from '@godiet-ui/Logo';
import { Spinner } from '@godiet-ui/Spinner';

interface PageLoaderProps {
  isLoading: boolean;
}

export function PageLoader({ isLoading }: PageLoaderProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed left-0 top-0 grid h-full w-full place-items-center bg-teal-900">
      <div className="flex flex-col items-center gap-4">
        <Logo className="text-3xl text-white" />

        <Spinner className="fill-white text-teal-700" />
      </div>
    </div>
  );
}
