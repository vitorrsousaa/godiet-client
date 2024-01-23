import { Button } from '@godiet-components/Button';
import { Logo } from '@godiet-components/Logo';

import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <html className="h-full">
      <body className="flex h-full">
        <div className="mx-auto flex h-full w-full max-w-[50rem] flex-col">
          <header className="z-50 mb-auto flex w-full justify-center py-4">
            <nav className="px-4 sm:px-6 lg:px-8" aria-label="Global">
              <a
                className="flex-none text-xl font-semibold dark:text-white sm:text-3xl"
                href="/"
              >
                <Logo />
              </a>
            </nav>
          </header>

          <div className="flex flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <h1 className="block text-7xl font-bold text-foreground dark:text-white sm:text-9xl">
              404
            </h1>
            <h1 className="block text-2xl font-bold text-white"></h1>
            <p className="mt-3 text-center text-gray-600 dark:text-gray-400">
              Oops, alguma coisa deu errado.
            </p>
            <p className="max-w-xl text-center text-gray-600 dark:text-gray-400">
              Estamos revendo todos os planejamentos alimentares, e resolvendo
              algumas coisinhas.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
              <Link rel="noreferrer" to="/">
                <Button>Volte para a página inicial</Button>
              </Link>
            </div>
          </div>

          <footer className="mt-auto py-5 text-center">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <p className="text-sm text-gray-500">
                Todos os direito reservados. 2024.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
