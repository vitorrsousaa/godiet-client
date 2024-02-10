export function Features() {
  return (
    <>
      <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/*<!-- Grid --> */}
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-7">
            {/*<!-- Grid --> */}
            <div className="grid grid-cols-12 items-center gap-2 sm:gap-6 lg:-translate-x-10">
              <div className="col-span-4">
                <img
                  className="rounded-xl"
                  src="https://images.unsplash.com/photo-1450650795614-745f80d91080?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="-bow-grape"
                />
              </div>
              {/*<!-- End Col --> */}

              <div className="col-span-3">
                <img
                  className="rounded-xl"
                  src="https://images.unsplash.com/photo-1421494756418-72f0f89c6bfd?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="bow-of-fruits"
                />
              </div>
              {/*<!-- End Col --> */}

              <div className="col-span-5">
                <img
                  className="rounded-xl"
                  src="https://images.unsplash.com/photo-1528711832838-46c60d34b4e3?q=80&w=1298&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="bow-of-cereals"
                />
              </div>
              {/*<!-- End Col --> */}
            </div>
            {/*<!-- End Grid --> */}
          </div>
          {/*<!-- End Col --> */}

          <div className="mt-5 sm:mt-10 lg:col-span-5 lg:mt-0">
            <div className="space-y-6 sm:space-y-8">
              {/*<!-- Title --> */}
              <div className="space-y-2 md:space-y-4">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 lg:text-4xl">
                  Ferramenta completa para o seu atendimento
                </h2>
                <p className="text-gray-500">
                  Com a simplicidade e eficácia do nosso software, você pode dar
                  vida aos seus conceitos nutricionais de maneira fácil e
                  intuitiva.
                </p>
              </div>
              {/*<!-- End Title --> */}

              {/*<!-- List --> */}
              <ul role="list" className="space-y-2 sm:space-y-4">
                <li className="flex space-x-3">
                  {/*<!-- Solid Check --> */}
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-teal-50 text-teal-600 dark:bg-teal-800/30 dark:text-teal-500">
                    <svg
                      className="h-3.5 w-3.5 flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {/*<!-- End Solid Check --> */}

                  <span className="text-sm text-gray-500 sm:text-base">
                    <span className="font-bold">Planos alimentares</span> –
                    calculados
                  </span>
                </li>

                <li className="flex space-x-3">
                  {/*<!-- Solid Check --> */}
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-teal-50 text-teal-600 dark:bg-teal-800/30 dark:text-teal-500">
                    <svg
                      className="h-3.5 w-3.5 flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {/*<!-- End Solid Check --> */}

                  <span className="text-sm text-gray-500 sm:text-base">
                    Prescrições de suplementos e manipulados
                  </span>
                </li>

                <li className="flex space-x-3">
                  {/*<!-- Solid Check --> */}
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-teal-50 text-teal-600 dark:bg-teal-800/30 dark:text-teal-500">
                    <svg
                      className="h-3.5 w-3.5 flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {/*<!-- End Solid Check --> */}

                  <span className="text-sm text-gray-500 sm:text-base">
                    Gráficos para acompanhar a{' '}
                    <span className="font-bold">evolução</span> do paciente
                  </span>
                </li>
              </ul>
              {/*<!-- End List --> */}
            </div>
          </div>
          {/*<!-- End Col --> */}
        </div>
      </div>
    </>
  );
}
