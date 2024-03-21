import { useState } from 'react';

export function useSampleHook() {
  const [state] = useState();

  return {
    state,
    isLoading: true,
    isError: false,
    noData: false,
  };
}
