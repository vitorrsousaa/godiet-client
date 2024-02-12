import { ROUTES } from '@godiet-config';
import { useAuth } from '@godiet-hooks/auth';

import { Navigate, Outlet } from 'react-router-dom';

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { signedIn } = useAuth();

  if (!signedIn && isPrivate) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (signedIn && !isPrivate) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
}
