import { createContext, useCallback, useEffect, useState } from 'react';

import { PageLoader } from '@godiet-components/PageLoader';
import { LOCAL_STORAGE_KEYS } from '@godiet-config';

import toast from 'react-hot-toast';

interface AuthContextValue {
  signedIn: boolean;
  signin: (accessToken: string) => void;
  signout: () => void;
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

  const isFetching = false;
  const isSuccess = true;
  const isError = false;

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);

    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    // queryClient.invalidateQueries({
    //   queryKey: ["users", "me"],
    // });

    setSignedIn(false);
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou!');

      signout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return (
    <AuthContext.Provider
      value={{ signedIn: isSuccess && signedIn, signin, signout }}
    >
      <PageLoader isLoading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  );
}
