import { cn } from '@godiet-utils/cn';

interface CardProps {
  title: string;
  description: string;
  price: number;
  benefits: string[];
  malefits?: string[];
  mostPopular?: boolean;
  footer?: string;
}

export function Card(props: CardProps) {
  const { title, description, price, benefits, malefits, footer, mostPopular } =
    props;
  return (
    <div>
      {/**<!-- Card --> */}
      <div className="relative z-10 rounded-xl border bg-white p-4 dark:border-teal-700 dark:bg-emerald-950/50 md:p-10">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          {title}
        </h3>
        <div className="text-sm text-gray-400">{description}</div>

        {mostPopular && (
          <span className="absolute end-0 top-0 rounded-es-xl rounded-se-xl bg-teal-900 px-3 py-1.5 text-xs font-medium text-white dark:bg-white dark:text-gray-800">
            Most popular
          </span>
        )}

        <div className="mt-5">
          <span className="text-6xl font-bold text-gray-800 dark:text-gray-200">
            R$ {price}
          </span>
          <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
            .00
          </span>
          <span className="ms-3 text-gray-400">BRL / mensalmente</span>
        </div>

        <div className="mt-5 grid gap-y-2 py-4 first:pt-0 last:pb-0 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-0">
          {/**<!-- List --> */}
          <ul className="space-y-2 text-sm sm:text-base">
            {benefits.map((benefit) => (
              <li className="flex space-x-3" key={benefit}>
                <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-teal-200 px-1 text-teal-600 dark:bg-teal-800/30 dark:text-teal-500">
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
                <span className="text-gray-800 dark:text-gray-200">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
          {/**<!-- End List --> */}

          {/**<!-- List --> */}
          {malefits && (
            <ul className="space-y-2 text-sm sm:text-base">
              {malefits.map((malefit) => (
                <li className="flex space-x-3" key={malefit}>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-200 text-gray-500 dark:bg-gray-800">
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
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">
                    {malefit}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/**<!-- End List --> */}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-x-4 py-4 first:pt-0 last:pb-0">
          <div>
            <p className="text-sm text-gray-500">
              {footer ? footer : 'Cancele qualquer momento.'}
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className={cn(
                'inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm transition-all duration-200 ease-in-out hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-teal-900/40 dark:text-white dark:hover:bg-teal-800/60 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600',
                mostPopular &&
                  'bg-teal-700 text-white hover:bg-teal-800/60 dark:border-teal-900 dark:bg-teal-900 dark:hover:bg-teal-800'
              )}
            >
              Cadastre
            </button>
          </div>
        </div>
      </div>
      {/**<!-- End Card --> */}
    </div>
  );
}
