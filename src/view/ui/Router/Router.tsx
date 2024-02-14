/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from 'react';

import { ROUTES } from '@godiet-config';
import { NotFound } from '@godiet-pages/NotFound';
import { Logo } from '@godiet-ui/Logo';
import { Spinner } from '@godiet-ui/Spinner';
import { lazyLoad } from '@godiet-utils/lazyLoad';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthGuard } from './AuthGuard';

const { CreatePlanningEquivalent } = lazyLoad(
  () => import('@godiet-pages/CreatePlanningEquivalent')
);

const { Dashboard } = lazyLoad(() => import('@godiet-pages/Dashboard'));
const { DetailsPlanningMeal } = lazyLoad(
  () => import('@godiet-pages/DetailsPlanningMeal')
);
const { DashboardLayout } = lazyLoad(
  () => import('@godiet-layouts/DashboardLayout')
);

const { Login } = lazyLoad(() => import('@godiet-pages/Login'));
const { LandingPage } = lazyLoad(() => import('@godiet-pages/LandingPage'));
const { Register } = lazyLoad(() => import('@godiet-pages/Register'));
const { Settings } = lazyLoad(() => import('@godiet-pages/Settings'));
const { SettingsAnamnesis } = lazyLoad(
  () => import('@godiet-pages/SettingsAnamnesis')
);

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
const { PlanningMeal } = lazyLoad(() => import('@godiet-pages/PlanningMeal'));

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
            <Route path={ROUTES.HOME} element={<LandingPage />} />
          </Route>
          <Route element={<AuthGuard isPrivate={true} />}>
            <Route element={<DashboardLayout />}>
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
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
                  path={ROUTES.SETTINGS_ANAMNESIS}
                  element={<SettingsAnamnesis />}
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
              <Route
                path={ROUTES.PLANNING_MEAL_BY_PATIENT}
                element={<PlanningMeal />}
              />
              <Route
                path={ROUTES.PLANNING_MEAL_BY_PATIENT_SHOW}
                element={<DetailsPlanningMeal />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
