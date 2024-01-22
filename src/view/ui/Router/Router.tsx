import { routes } from '@godiet-constants/routes';
import { Login } from '@godiet-pages/Login';
import { Register } from '@godiet-pages/Register';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.REGISTER} element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
