import { createContext, useCallback, useEffect, useState } from 'react';

import { PageLoader } from '@godiet-components/PageLoader';
import { LOCAL_STORAGE_KEYS } from '@godiet-config';
import { useRowStorageContext } from '@godiet-hooks/rowStorage';
import { useQuery, useQueryClient } from '@godiet-query';
import { userService } from '@godiet-services/user';

import toast from 'react-hot-toast';

interface AuthContextValue {
  signedIn: boolean;
  signin: (accessToken: string) => void;
  signout: () => void;
  email?: string;
  name?: string;
}

export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storageAccessToken = localStorage.getItem(
      LOCAL_STORAGE_KEYS.ACCESS_TOKEN
    );

    return !!storageAccessToken;
  });

  const queryClient = useQueryClient();
  const { removeAllRowSelectionStorage } = useRowStorageContext();

  const { data, isError, isFetching, isSuccess } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: async () => userService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  });

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);

    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    queryClient.invalidateQueries({
      queryKey: ['users', 'me'],
    });

    removeAllRowSelectionStorage();

    setSignedIn(false);
  }, [queryClient, removeAllRowSelectionStorage]);

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou!');

      signout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        signin,
        signout,
        email: data?.email,
        name: data?.name,
      }}
    >
      <PageLoader isLoading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  );
}
