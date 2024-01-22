import { Button } from '@godiet-components/Button';
import { cn } from '@godiet-utils/cn';

import {
  BellIcon,
  DashboardIcon,
  IdCardIcon,
  PersonIcon,
  StarFilledIcon,
} from '@radix-ui/react-icons';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4  font-semibold tracking-tight">Conta</h2>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start ">
              <span className="inline-flex items-center gap-1">
                <PersonIcon />
                Meu perfil
              </span>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <span className="inline-flex items-center gap-1">
                <BellIcon />
                Notificações
              </span>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <span className="inline-flex items-center gap-1">
                <StarFilledIcon />
                Recompensas
              </span>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 font-semibold tracking-tight">Assinatura</h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <span className="inline-flex items-center gap-1">
                <DashboardIcon />
                Meu plano
              </span>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <span className="inline-flex items-center gap-1">
                <IdCardIcon />
                Pagamentos
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
