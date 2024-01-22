import { routes } from '@godiet-constants/routes';
import { DashboardLayout } from '@godiet-layouts/DashboardLayout';
import { Login } from '@godiet-pages/Login';
import { Register } from '@godiet-pages/Register';
import { Settings } from '@godiet-pages/Settings';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthGuard } from './AuthGuard';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route path={routes.LOGIN} element={<Login />} />
          <Route path={routes.REGISTER} element={<Register />} />
        </Route>
        <Route element={<AuthGuard isPrivate={true} />}>
          <Route element={<DashboardLayout />}>
            <Route path={routes.HOME} element={<div>Home</div>} />
            <Route path={routes.SETTINGS} element={<Settings />} />
            <Route path={routes.PATIENTS} element={<div>patients</div>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
