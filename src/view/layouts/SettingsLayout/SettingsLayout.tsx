import { Sidebar } from '@godiet-components/Sidebar';
import { ROUTES } from '@godiet-config';

import {
  BellIcon,
  DashboardIcon,
  IdCardIcon,
  PersonIcon,
  ReaderIcon,
  StarFilledIcon,
} from '@radix-ui/react-icons';
import { Outlet } from 'react-router-dom';

const sideBarItens = [
  {
    main: 'Conta',
    items: [
      {
        icon: <PersonIcon />,
        title: 'Meu perfil',
        href: ROUTES.SETTINGS,
      },
      {
        icon: <BellIcon />,
        title: 'Notificações',
        href: ROUTES.SETTINGS_NOTIFICATIONS,
      },
      {
        icon: <StarFilledIcon />,
        title: 'Recompensas',
        href: ROUTES.SETTINGS_REWARDS,
      },
    ],
  },
  {
    main: 'Preferências',
    items: [
      {
        icon: <ReaderIcon />,
        title: 'Anamneses',
        href: ROUTES.SETTINGS_ANAMNESIS,
      },
    ],
  },
  {
    main: 'Assinatura',
    items: [
      {
        icon: <DashboardIcon />,
        title: 'Meu plano',
        href: ROUTES.SETTINGS_MYPLAN,
      },
      {
        icon: <IdCardIcon />,
        title: 'Pagamentos',
        href: ROUTES.SETTINGS_PAYMENTS,
      },
    ],
  },
];

export function SettingsLayout() {
  return (
    <section className="flex h-full flex-row">
      <aside className="h-90 h-full w-20 sm:w-1/3 lg:w-1/4">
        <Sidebar sideBarItens={sideBarItens} />
      </aside>
      <div className="flex h-full w-full flex-col gap-4">
        <Outlet />
      </div>
    </section>
  );
}
