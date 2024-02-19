import { ROUTES } from '@godiet-config';
import { Button } from '@godiet-ui/Button';
import { cn } from '@godiet-utils/cn';

import {
  BellIcon,
  DashboardIcon,
  IdCardIcon,
  PersonIcon,
  ReaderIcon,
  StarFilledIcon,
} from '@radix-ui/react-icons';
import { Link, useLocation } from 'react-router-dom';

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

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const { pathname } = useLocation();

  return (
    <nav className={cn('mr-4 h-full border-r-[1px] pb-12', className)}>
      <div className="space-y-4">
        {sideBarItens.map((sidebarItem) => (
          <div className="px-3 py-2" key={`sidebar-main-${sidebarItem.main}`}>
            <h2 className="mb-2 hidden px-4 font-semibold tracking-tight sm:block">
              {sidebarItem.main}
            </h2>
            <div className="space-y-1">
              {sidebarItem.items.map((item) => (
                <Link key={`sidebar-item-${item.title}`} to={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      'w-full justify-center transition-all sm:justify-start',
                      pathname === item.href && 'bg-gray-50 text-teal-600'
                    )}
                  >
                    <span className="inline-flex items-center gap-1 ">
                      {item.icon}
                      <span className="hidden sm:block">{item.title}</span>
                    </span>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
