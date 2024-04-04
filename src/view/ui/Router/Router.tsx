/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from 'react';

import { ROUTES } from '@godiet-config';
import { NotFound } from '@godiet-pages/NotFound';
import { Logo } from '@godiet-ui/Logo';
import { Spinner } from '@godiet-ui/Spinner';
import { lazyLoad } from '@godiet-utils/lazyLoad';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthGuard } from './AuthGuard';

const { Anamnesis } = lazyLoad(() => import('@godiet-pages/Anamnesis'));
const { CreateAnamnesis } = lazyLoad(
  () => import('@godiet-pages/CreateAnamnesis')
);
const { CreatePlanning } = lazyLoad(
  () => import('@godiet-pages/CreatePlanning')
);

const { Dashboard } = lazyLoad(() => import('@godiet-pages/Dashboard'));
const { DetailsPlanningMeal } = lazyLoad(
  () => import('@godiet-pages/DetailsPlanningMeal')
);
const { DashboardLayout } = lazyLoad(
  () => import('@godiet-layouts/DashboardLayout')
);

const { FavoritesLayout } = lazyLoad(
  () => import('@godiet-layouts/FavoritesLayout')
);
const { FavoritesMeals } = lazyLoad(
  () => import('@godiet-pages/FavoritesMeals')
);
const { FavoritesAnamnesis } = lazyLoad(
  () => import('@godiet-pages/FavoritesAnamnesis')
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
const { PatientLayout } = lazyLoad(
  () => import('@godiet-layouts/PatientLayout')
);
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
          </Route>
          <Route element={<AuthGuard isPrivate={true} />}>
            <Route element={<DashboardLayout />}>
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />

              <Route path={ROUTES.PATIENTS} element={<Patients />} />

              <Route element={<FavoritesLayout />}>
                <Route
                  path={ROUTES.FAVORITES}
                  element={<FavoritesAnamnesis />}
                />

                <Route
                  path={ROUTES.FAVORITES_FOODS}
                  element={
                    <div className="flex flex-col">
                      Alimentos
                      <small>Esta página ainda esta em construção!</small>
                    </div>
                  }
                />

                <Route
                  path={ROUTES.FAVORITES_MEALS}
                  element={<FavoritesMeals />}
                />

                <Route
                  path={ROUTES.FAVORITES_ORIENTATIONS}
                  element={
                    <div className="flex flex-col">
                      Orientações
                      <small>Esta página ainda esta em construção!</small>
                    </div>
                  }
                />
                <Route
                  path={ROUTES.FAVORITES_MANIPULATED}
                  element={
                    <div className="flex flex-col">
                      Manipulados
                      <small>Esta página ainda esta em construção!</small>
                    </div>
                  }
                />
                <Route
                  path={ROUTES.FAVORITES_EXAMS}
                  element={
                    <div className="flex flex-col">
                      Exames
                      <small>Esta página ainda esta em construção!</small>
                    </div>
                  }
                />
                <Route
                  path={ROUTES.FAVORITES_OBSERVATIONS}
                  element={
                    <div className="flex flex-col">
                      Observações
                      <small>Esta página ainda esta em construção!</small>
                    </div>
                  }
                />
                <Route
                  path={ROUTES.FAVORITES_PLANNING}
                  element={
                    <div className="flex flex-col">
                      Plano alimentar
                      <small>Esta página ainda esta em construção!</small>
                    </div>
                  }
                />
              </Route>

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

              <Route element={<PatientLayout />}>
                <Route path={ROUTES.PATIENTS_BY_ID} element={<Patient />} />

                <Route path={ROUTES.ANAMNESIS} element={<Anamnesis />} />

                <Route
                  path={ROUTES.CREATE_ANAMNESIS}
                  element={<CreateAnamnesis />}
                />

                <Route
                  path={ROUTES.PLANNING_MEAL_BY_PATIENT}
                  element={<PlanningMeal />}
                />
                <Route
                  path={ROUTES.PLANNING_MEAL_BY_PATIENT_SHOW}
                  element={<DetailsPlanningMeal />}
                />
                <Route
                  path={ROUTES.CREATE_PLANNING_CONVENTIONAL}
                  element={<CreatePlanning />}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
