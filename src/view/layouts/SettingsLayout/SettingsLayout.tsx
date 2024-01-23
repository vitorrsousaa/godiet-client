import { Outlet } from 'react-router-dom';

import { Sidebar } from './components/Sidebar';

export function SettingsLayout() {
  return (
    <div className="flex flex-row">
      <aside className="h-90 w-20 sm:w-1/3 lg:w-1/4">
        <Sidebar />
      </aside>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
