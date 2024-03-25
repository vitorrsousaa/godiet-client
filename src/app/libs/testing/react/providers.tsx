import { ReactNode, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { BrowserRouter } from 'react-router-dom';

type ProvidersProps = {
  children: ReactNode;
};

function AllTheProviders(props: ProvidersProps) {
  const { children } = props;

  const [queryClient] = useState(() => new QueryClient());

  const defaultValues = {};

  const methods = useForm({ defaultValues });

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <FormProvider {...methods}>{children}</FormProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export { AllTheProviders };
