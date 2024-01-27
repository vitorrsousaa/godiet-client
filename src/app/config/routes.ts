export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  HOME: '/',
  PATIENTS: '/pacientes',
  PATIENTS_BY_ID: '/pacientes/:id',
  CREATE_PLANNING_CONVENTIONAL: '/pacientes/:id/plano/convencional',
  CREATE_PLANNING_GODIET: '/pacientes/:id/plano/godiet',
  SETTINGS: '/configuracoes',
  SETTINGS_NOTIFICATIONS: '/configuracoes/notificacoes',
  SETTINGS_REWARDS: '/configuracoes/recompensas',
  SETTINGS_MYPLAN: '/configuracoes/meu-plano',
  SETTINGS_PAYMENTS: '/configuracoes/pagamentos',
} as const;
