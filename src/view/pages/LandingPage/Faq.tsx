export function Faq() {
  return (
    <>
      {/**<!-- FAQ --> */}
      <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/**<!-- Title --> */}
        <div className="mx-auto mb-10 max-w-2xl lg:mb-14">
          <h2 className="text-2xl font-bold dark:text-white md:text-4xl md:leading-tight">
            Perguntas frequentes
          </h2>
        </div>
        {/**<!-- End Title --> */}

        <div className="mx-auto max-w-2xl divide-y divide-gray-200 dark:divide-gray-700">
          <div className="py-8 first:pt-0 last:pb-0">
            <div className="flex gap-x-5">
              <svg
                className="mt-1 h-6 w-6 flex-shrink-0 text-gray-500"
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
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 md:text-lg">
                  O goDiet precisa ser instalado no computador?
                </h3>
                <p className="mt-1 text-gray-500">
                  Não. O goDiet não precisa ser instalado no computador e
                  totalmente online. Você pode acessar de qualquer lugar e de
                  qualquer dispositivo.
                </p>
              </div>
            </div>
          </div>

          <div className="py-8 first:pt-0 last:pb-0">
            <div className="flex gap-x-5">
              <svg
                className="mt-1 h-6 w-6 flex-shrink-0 text-gray-500"
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
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 md:text-lg">
                  Posso cancelar a qualquer momento?
                </h3>
                <p className="mt-1 text-gray-500">
                  Sim, é possível realizar o cancelamento a qualquer momento.
                  Não há fidelidade e você pode cancelar quando quiser. Caso
                  tenha algum problema durante este processo, pode entrar em
                  contato com a nossa equipe.
                </p>
              </div>
            </div>
          </div>

          <div className="py-8 first:pt-0 last:pb-0">
            <div className="flex gap-x-5">
              <svg
                className="mt-1 h-6 w-6 flex-shrink-0 text-gray-500"
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
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 md:text-lg">
                  O que eu ganho como beta-tester?
                </h3>
                <p className="mt-1 text-gray-500">
                  Todos os nutricionistas que apoiarem nosso processo inicial
                  serão adicionados a uma lista de espera para receber um
                  desconto especial quando o goDiet for lançado oficialmente.
                  Além de outras bonificações por ter auxiliado nossa
                  construção.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/**<!-- End FAQ --> */}
    </>
  );
}
