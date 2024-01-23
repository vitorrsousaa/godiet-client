export const routes = {
  LOGIN: '/login',
  REGISTER: '/register',
  HOME: '/',
  PATIENTS: '/pacientes',
  PATIENTS_BY_ID: '/pacientes/:id',
  SETTINGS: '/configuracoes',
  SETTINGS_NOTIFICATIONS: '/configuracoes/notificacoes',
  SETTINGS_REWARDS: '/configuracoes/recompensas',
  SETTINGS_MYPLAN: '/configuracoes/meu-plano',
  SETTINGS_PAYMENTS: '/configuracoes/pagamentos',
} as const;
