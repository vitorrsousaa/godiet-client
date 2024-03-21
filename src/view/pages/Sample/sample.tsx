import { SampleEmpty } from './sample.empty';
import { SampleError } from './sample.error';
import { useSampleHook } from './sample.hook';
import { SampleLoading } from './sample.loading';
import { SampleView } from './sample.view';

export function Sample() {
  const { isError, isLoading, noData } = useSampleHook();

  if (isError) {
    return <SampleError />;
  }

  if (isLoading) {
    return <SampleLoading />;
  }

  if (noData) {
    return <SampleEmpty />;
  }

  return (
    <div>
      <SampleView />
    </div>
  );
}
