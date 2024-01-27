import { useCallback } from 'react';

import { AddFoodModalProps } from './AddFoodModal';

export function useAddFoodModalHook(props: AddFoodModalProps) {
  const { onClose } = props;

  const handleSubmit = useCallback(() => {
    console.log('data');
  }, [onClose]);

  return { handleSubmit };
}
