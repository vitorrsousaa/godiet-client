import { useContext } from 'react';

import { AuthContext } from '@godiet-contexts/auth';

export function useAuth() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return authContext;
}
