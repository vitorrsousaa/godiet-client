import { ROUTES } from '@godiet-config';
import { useAuth } from '@godiet-hooks/auth';
import { useNavigate } from '@godiet-hooks/routes';
import { Avatar } from '@godiet-ui/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@godiet-ui/DropdownMenu';
import { Logo } from '@godiet-ui/Logo';
import {
  NavigationMenu,
  navigationMenuTriggerStyle,
} from '@godiet-ui/NavigationMenu';
import { Tooltip } from '@godiet-ui/Tooltip';

import {
  BellIcon,
  ExclamationTriangleIcon,
  ExitIcon,
  GearIcon,
  StarFilledIcon,
} from '@radix-ui/react-icons';
import { Link, Outlet } from 'react-router-dom';

export function DashboardLayout() {
  const { signout, email, name } = useAuth();
  const { navigate } = useNavigate();

  return (
    <section className="h-full">
      <header className="flex h-20 items-center justify-between border-b-[1px] border-gray-200 px-3 sm:px-8">
        <div className="flex gap-1 sm:gap-4">
          <Logo />
          <NavigationMenu.Root>
            <NavigationMenu.List>
              <NavigationMenu.Item>
                <Link to={ROUTES.HOME} className={navigationMenuTriggerStyle()}>
                  Home
                </Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <Link
                  to={ROUTES.PATIENTS}
                  className={navigationMenuTriggerStyle()}
                >
                  Pacientes
                </Link>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </div>
        <div>
          <NavigationMenu.Root>
            <NavigationMenu.List className="items-center">
              <NavigationMenu.Item>
                <Tooltip content={'Configurações'}>
                  <Link
                    to={ROUTES.SETTINGS}
                    className={navigationMenuTriggerStyle()}
                  >
                    <GearIcon className="h-4 w-4 text-icon sm:h-5 sm:w-5" />
                  </Link>
                </Tooltip>
              </NavigationMenu.Item>
              <NavigationMenu.Item className="hidden sm:block">
                <Tooltip content={'Notificações'}>
                  <Link to="/" className={navigationMenuTriggerStyle()}>
                    <BellIcon className="h-4 w-4 text-icon sm:h-5 sm:w-5" />
                  </Link>
                </Tooltip>
              </NavigationMenu.Item>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <NavigationMenu.Item>
                    <Avatar
                      className="ml-2 hover:cursor-pointer"
                      src="https://github.com/shadcn.png"
                      name={name || 'default'}
                    />
                  </NavigationMenu.Item>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-8 min-w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {name || 'default'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="space-x-4 hover:cursor-pointer ">
                      <ExclamationTriangleIcon />
                      <span>Ajuda</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="space-x-4 hover:cursor-pointer"
                      onClick={() => navigate('FAVORITES')}
                    >
                      <StarFilledIcon />
                      <span>Meus favoritos</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="space-x-4 hover:cursor-pointer"
                      onClick={signout}
                    >
                      <ExitIcon />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </div>
      </header>

      <div className="h-full p-3 sm:p-8">
        <Outlet />
      </div>
    </section>
  );
}
