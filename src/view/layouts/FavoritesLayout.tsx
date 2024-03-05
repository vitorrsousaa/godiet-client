import { Outlet } from 'react-router-dom';

export function FavoritesLayout() {
  return (
    <section className="flex h-full flex-row">
      <aside className="h-90 h-full w-20 sm:w-1/3 lg:w-1/4">
        {/* <Sidebar sideBarItens={sideBarItens} /> */}

        <h1>Sidebar</h1>
      </aside>

      <div className="flex h-full w-full flex-col gap-4">
        <Outlet />
      </div>
    </section>
  );
}
