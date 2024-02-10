import { useContext } from 'react';

import { RowStorageContext } from '@godiet-contexts/rowStorage';

export function useRowStorageContext() {
  const rowStorage = useContext(RowStorageContext);

  if (!rowStorage) {
    throw new Error('userowStorage must be used within an FoodProvider');
  }

  return rowStorage;
}
