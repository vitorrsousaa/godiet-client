export function Hero() {
  return (
    <>
      <div className="relative overflow-hidden before:absolute before:start-1/2 before:top-0 before:-z-[1] before:h-full before:w-full before:-translate-x-1/2 before:transform before:bg-[url('src/view/assets/polygon-bg-element-light.svg')] before:bg-cover before:bg-top before:bg-no-repeat dark:before:bg-[url('src/view/assets/polygon-bg-element-dark.svg')]">
        <div className="mx-auto max-w-[85rem] px-4 pb-10 pt-24 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <a
              className="inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white p-1 ps-3 text-sm text-gray-800 transition hover:border-gray-300 dark:border-teal-700 dark:bg-teal-800 dark:text-gray-200 dark:hover:border-teal-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="#"
            >
              Faça parte da lista de espera
              <span className="inline-flex items-center justify-center gap-x-2 rounded-full bg-gray-200 px-2.5 py-1.5 text-sm font-semibold text-gray-600 dark:bg-teal-900 dark:text-gray-400">
                <svg
                  className="h-4 w-4 flex-shrink-0"
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
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </a>
          </div>

          {/*<!-- Title --> */}
          <div className="mx-auto mt-5 max-w-2xl text-center">
            <h1 className="block text-4xl font-bold text-gray-800 dark:text-gray-200 md:text-5xl lg:text-6xl">
              O seu novo software de
              <span className="bg-gradient-to-tl from-green-400 to-teal-600 bg-clip-text text-transparent">
                {' '}
                nutrição
              </span>
            </h1>
          </div>

          <div className="mx-auto mt-5 max-w-3xl text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Bem-vindo à era da excelência em nutrição! Aqui, unimos forças com
              os melhores do mercado para oferecer a você o que há de mais
              inovador e eficiente.
            </p>
          </div>

          {/*<!-- Buttons --> */}
          <div className="mb-8 mt-12 flex justify-center gap-3">
            <a
              className="inline-flex items-center justify-center gap-x-3 rounded-md border border-transparent bg-gradient-to-tl from-green-600 to-teal-600 px-4 py-3 text-center  text-sm font-medium text-white transition-all duration-200 hover:from-teal-600 hover:to-green-600 focus:outline-none focus:ring-1 focus:ring-gray-600 dark:focus:ring-offset-gray-800"
              href="#"
            >
              Comece agora
              <svg
                className="h-4 w-4 flex-shrink-0"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </a>
          </div>
          {/*<!-- End Buttons --> */}
        </div>
      </div>
      {/*<!-- End Hero --> */}

      {/*<!-- Features --> */}
    </>
  );
}
