/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from 'react';

import { Logo } from '@godiet-components/Logo';
import { Spinner } from '@godiet-components/Spinner';
import { routes } from '@godiet-config';
import { NotFound } from '@godiet-pages/NotFound';
import { Patient } from '@godiet-pages/Patient';
import { lazyLoad } from '@godiet-utils/lazyLoad';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthGuard } from './AuthGuard';

const { DashboardLayout } = lazyLoad(
  () => import('@godiet-layouts/DashboardLayout')
);
const { SettingsLayout } = lazyLoad(
  () => import('@godiet-layouts/SettingsLayout')
);
const { Dashboard } = lazyLoad(() => import('@godiet-pages/Dashboard'));
const { Login } = lazyLoad(() => import('@godiet-pages/Login'));
const { Register } = lazyLoad(() => import('@godiet-pages/Register'));
const { Settings } = lazyLoad(() => import('@godiet-pages/Settings'));
const { SettingsNotification } = lazyLoad(
  () => import('@godiet-pages/SettingsNotification')
);
const { SettingsRewards } = lazyLoad(
  () => import('@godiet-pages/SettingsRewards')
);
const { Patients } = lazyLoad(() => import('@godiet-pages/Patients'));

export function Router() {
  return (
    <Suspense
      fallback={
        <div className="fixed left-0 top-0 grid h-full w-full place-items-center bg-teal-900">
          <div className="flex flex-col items-center gap-4">
            <Logo className="text-3xl text-white" />

            <Spinner className="fill-white text-teal-700" />
          </div>
        </div>
      }
    >
      <BrowserRouter>
        <Routes>
          <Route path={'*'} element={<NotFound />} />
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
              <Route path={routes.PATIENTS_BY_ID} element={<Patient />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
