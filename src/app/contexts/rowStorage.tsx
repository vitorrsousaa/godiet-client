import { createContext, useCallback, useRef } from 'react';

import { LOCAL_STORAGE_KEYS } from '@godiet-config';

interface rowKeyParams {
  mealIndex: number;
  categoryId: string;
  portion: number;
}

interface addRowSelectionParams {
  mealIndex: number;
  categoryId: string;
  portion: number;
  rowSelection: Record<string, boolean>;
}

interface RowStorageContextValue {
  addRowSelectionStorage: (
    addRowSelectionParams: addRowSelectionParams
  ) => void;
  getRowSelectionStorage: (
    getRowParams: rowKeyParams
  ) => Record<string, boolean>;
  removeAllRowSelectionStorage: () => void;
}

export const RowStorageContext = createContext<RowStorageContextValue>(
  {} as RowStorageContextValue
);

export function RowStorageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const keys = useRef<string[]>([]);

  const generateKey = useCallback(
    ({ mealIndex, categoryId, portion }: rowKeyParams) => {
      const key = `${LOCAL_STORAGE_KEYS.FOODS}-rows-${mealIndex}-${categoryId}-${portion}`;

      // setKeys((prev) => {
      //   const newKeys = [...prev, key];
      //   return newKeys;
      // });
      keys.current = [...keys.current, key];

      return key;
    },
    []
  );

  const addRowSelectionStorage = useCallback(
    (addRowSelection: addRowSelectionParams) => {
      const { categoryId, mealIndex, portion, rowSelection } = addRowSelection;
      const key = generateKey({ categoryId, mealIndex, portion });

      localStorage.setItem(key, JSON.stringify(rowSelection));
    },
    [generateKey]
  );

  const getRowSelectionStorage = useCallback(
    (getRowParams: rowKeyParams) => {
      const { categoryId, mealIndex, portion } = getRowParams;
      const key = generateKey({ categoryId, mealIndex, portion });

      const rowSelection = localStorage.getItem(key);

      return rowSelection ? JSON.parse(rowSelection) : {};
    },
    [generateKey]
  );

  const removeAllRowSelectionStorage = useCallback(() => {
    const keysToRemove = [...keys.current];

    for (let i = 0; i < keys.current.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(LOCAL_STORAGE_KEYS.FOODS)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });
  }, [keys]);

  return (
    <RowStorageContext.Provider
      value={{
        addRowSelectionStorage,
        getRowSelectionStorage,
        removeAllRowSelectionStorage,
      }}
    >
      {children}
    </RowStorageContext.Provider>
  );
}
