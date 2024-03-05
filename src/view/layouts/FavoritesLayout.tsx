import { Sidebar, SideItem } from '@godiet-components/Sidebar';
import { ROUTES } from '@godiet-config';

import {
  HobbyKnifeIcon,
  PieChartIcon,
  ReaderIcon,
  RowsIcon,
} from '@radix-ui/react-icons';
import { Outlet } from 'react-router-dom';

const sideBarItens: SideItem[] = [
  {
    items: [
      {
        href: ROUTES.FAVORITES,
        icon: <ReaderIcon className="h-4 w-4" />,
        title: 'Anemneses',
      },
      {
        href: ROUTES.FAVORITES_FOODS,
        icon: <HobbyKnifeIcon className="h-4 w-4" />,
        title: 'Alimentos',
      },
      {
        href: ROUTES.FAVORITES_MEALS,
        title: 'Refeições',
        icon: <PieChartIcon className="h-4 w-4" />,
      },
      {
        href: ROUTES.FAVORITES_ORIENTATIONS,
        title: 'Orientações',
        icon: <RowsIcon className="h-4 w-4" />,
      },
    ],
  },
];

export function FavoritesLayout() {
  return (
    <section className="flex h-full flex-col gap-6">
      <div>
        <h1 className="text-xl font-medium">Meus favoritos</h1>
        <small className="font-medium text-gray-500">
          Nesta página você administra todos os modelos e favoritos utilizados
          por você aqui no goDiet.
        </small>
      </div>
      <div className="flex h-full flex-row">
        <aside className="h-90 h-full w-20 sm:w-1/3 lg:w-1/4">
          <Sidebar sideBarItens={sideBarItens} className="[&+h2]:hidden" />
        </aside>

        <div className="flex h-full w-full flex-col gap-4">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
