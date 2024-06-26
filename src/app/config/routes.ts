export const ROUTES = {
  ANAMNESIS: '/pacientes/:id/anamnese',
  CREATE_ANAMNESIS: '/pacientes/:id/anamnese/criar',
  CREATE_PLANNING_CONVENTIONAL: '/pacientes/:id/plano/convencional',
  DASHBOARD: '/',
  ENERGY_CALCULATION: '/pacientes/:id/calculo-energetico',
  CREATE_ENERGY_CALCULATION: '/pacientes/:id/calculo-energetico/criar',
  LOGIN: '/login',
  PATIENTS: '/pacientes',
  PATIENTS_BY_ID: '/pacientes/:id',
  PLANNING_MEAL_BY_PATIENT: '/pacientes/:id/plano',
  PLANNING_MEAL_BY_PATIENT_SHOW: '/pacientes/:id/plano/:planningId',
  EDITING_PLANNING_MEAL_BY_PATIENT: '/pacientes/:id/plano/:planningId/editar',
  REGISTER: '/register',
  SETTINGS: '/configuracoes',
  SETTINGS_MYPLAN: '/configuracoes/meu-plano',
  SETTINGS_NOTIFICATIONS: '/configuracoes/notificacoes',
  SETTINGS_PAYMENTS: '/configuracoes/pagamentos',
  SETTINGS_REWARDS: '/configuracoes/recompensas',
  FAVORITES: '/favoritos/anamneses',
  FAVORITES_FOODS: '/favoritos/alimentos',
  FAVORITES_ORIENTATIONS: '/favoritos/orientacoes',
  FAVORITES_OBSERVATIONS: '/favoritos/observacoes',
  FAVORITES_MEALS: '/favoritos/refeicoes',
  FAVORITES_MANIPULATED: '/favoritos/manipulados',
  FAVORITES_PLANNING: '/favoritos/plano-alimentar',
  FAVORITES_EXAMS: '/favoritos/exames',
} as const;
