import { routes } from '@godiet-config';
import { DashboardLayout } from '@godiet-layouts/DashboardLayout';
import { SettingsLayout } from '@godiet-layouts/SettingsLayout';
import { Dashboard } from '@godiet-pages/Dashboard';
import { Login } from '@godiet-pages/Login';
import { Patients } from '@godiet-pages/Patients';
import { Register } from '@godiet-pages/Register';
import { Settings } from '@godiet-pages/Settings';
import { SettingsNotification } from '@godiet-pages/SettingsNotification';
import { SettingsRewards } from '@godiet-pages/SettingsRewards';

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
            <Route path={routes.HOME} element={<Dashboard />} />
            <Route element={<SettingsLayout />}>
              <Route path={routes.SETTINGS} element={<Settings />} />
              <Route
                path={routes.SETTINGS_NOTIFICATIONS}
                element={<SettingsNotification />}
              />
              <Route
                path={routes.SETTINGS_REWARDS}
                element={<SettingsRewards />}
              />
              <Route
                path={routes.SETTINGS_PAYMENTS}
                element={<div>Pagamentos</div>}
              />
              <Route
                path={routes.SETTINGS_MYPLAN}
                element={<div>Meu plano</div>}
              />
            </Route>
            <Route path={routes.PATIENTS} element={<Patients />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
