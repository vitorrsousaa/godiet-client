/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from 'react';

import { Logo } from '@godiet-components/Logo';
import { Spinner } from '@godiet-components/Spinner';
import { ROUTES } from '@godiet-config';
import { NotFound } from '@godiet-pages/NotFound';
import { lazyLoad } from '@godiet-utils/lazyLoad';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthGuard } from './AuthGuard';

const { CreatePlanningEquivalent } = lazyLoad(
  () => import('@godiet-pages/CreatePlanningEquivalent')
);

const { Dashboard } = lazyLoad(() => import('@godiet-pages/Dashboard'));
const { DashboardLayout } = lazyLoad(
  () => import('@godiet-layouts/DashboardLayout')
);

const { Login } = lazyLoad(() => import('@godiet-pages/Login'));
const { Register } = lazyLoad(() => import('@godiet-pages/Register'));
const { Settings } = lazyLoad(() => import('@godiet-pages/Settings'));
const { SettingsLayout } = lazyLoad(
  () => import('@godiet-layouts/SettingsLayout')
);
const { SettingsNotification } = lazyLoad(
  () => import('@godiet-pages/SettingsNotification')
);
const { SettingsRewards } = lazyLoad(
  () => import('@godiet-pages/SettingsRewards')
);
const { Patients } = lazyLoad(() => import('@godiet-pages/Patients'));
const { Patient } = lazyLoad(() => import('@godiet-pages/Patient'));

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
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
          </Route>
          <Route element={<AuthGuard isPrivate={true} />}>
            <Route element={<DashboardLayout />}>
              <Route path={ROUTES.HOME} element={<Dashboard />} />
              <Route element={<SettingsLayout />}>
                <Route path={ROUTES.SETTINGS} element={<Settings />} />
                <Route
                  path={ROUTES.SETTINGS_NOTIFICATIONS}
                  element={<SettingsNotification />}
                />
                <Route
                  path={ROUTES.SETTINGS_REWARDS}
                  element={<SettingsRewards />}
                />
                <Route
                  path={ROUTES.SETTINGS_PAYMENTS}
                  element={<div>Pagamentos</div>}
                />
                <Route
                  path={ROUTES.SETTINGS_MYPLAN}
                  element={<div>Meu plano</div>}
                />
              </Route>
              <Route path={ROUTES.PATIENTS} element={<Patients />} />
              <Route path={ROUTES.PATIENTS_BY_ID} element={<Patient />} />
              <Route
                path={ROUTES.CREATE_PLANNING_GODIET}
                element={<CreatePlanningEquivalent />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
