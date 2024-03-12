import { Button } from '@godiet-ui/Button';
import { cn } from '@godiet-utils/cn';

import { Link, useLocation } from 'react-router-dom';

interface Item {
  icon: React.ReactNode;
  title: string;
  href: string;
}

export interface SideItem {
  main?: string;
  items: Item[];
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  sideBarItens: SideItem[];
}

export function Sidebar({ className, sideBarItens }: SidebarProps) {
  const { pathname } = useLocation();

  return (
    <nav className={cn('mr-4 h-full border-r-[1px] pb-12', className)}>
      <div className="space-y-4">
        {sideBarItens.map((sidebarItem) => (
          <div
            className="px-3 py-2"
            key={`sidebar-main-${sidebarItem.main ? sidebarItem.main : sidebarItem.items[0].href}`}
          >
            {sidebarItem.main && (
              <h2 className="mb-2 hidden px-4 font-semibold tracking-tight sm:block">
                {sidebarItem.main}
              </h2>
            )}

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
