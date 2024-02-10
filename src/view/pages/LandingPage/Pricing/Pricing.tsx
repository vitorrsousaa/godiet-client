import { Card } from './Card';

export function Pricing() {
  return (
    <>
      <div className="overflow-hidden">
        <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="mx-auto mb-8 max-w-2xl text-center lg:mb-14">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 sm:text-6xl md:text-6xl lg:text-6xl">
              Planos
            </h2>
          </div>

          <div className="relative xl:mx-auto xl:w-10/12">
            {/**<!-- Grid --> */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
              <Card
                title="Beta tester"
                description="Plano inicial para validação da plataforma."
                price={5}
                benefits={[
                  'Cadastre até 10 pacientes',
                  'Crie anamneses',
                  'Crie o plano alimentar',
                ]}
              />

              <Card
                title="Pré-venda"
                description="Assinatura de pré-venda da plataforma"
                footer="Assine agora e garanta 50% de desconto"
                price={39}
                benefits={[
                  'Cadastre até 200 pacientes',
                  'Crie anamneses próprias',
                  'Integração com whatsapp',
                ]}
                mostPopular
              />
            </div>
            {/**<!-- End Grid --> */}

            {/**<!-- SVG Element --> */}
            <div className="mt-7">
              <div className="absolute end-0 top-0 hidden translate-x-16 translate-y-16 md:block">
                <svg
                  className="h-auto w-16 text-orange-500"
                  width="121"
                  height="135"
                  viewBox="0 0 121 135"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              {/**<!-- End SVG Element --> */}

              {/**<!-- SVG Element --> */}
              <div className="absolute bottom-0 start-0 hidden -translate-x-16 translate-y-16 md:block">
                <svg
                  className="h-auto w-56 text-cyan-500"
                  width="347"
                  height="188"
                  viewBox="0 0 347 188"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                    stroke="currentColor"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            {/**<!-- End SVG Element --> */}
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-20">
          {/**<!-- Button Group --> */}
          <div className="mt-8 flex items-center justify-center gap-x-3 md:mt-12">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Precisa de mais?
            </p>

            <button
              type="button"
              className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-teal-700 dark:bg-teal-900 dark:text-white dark:hover:bg-teal-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              Entre em contato
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
