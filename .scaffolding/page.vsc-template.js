(function Template() {
  const toPascalCase = (str) =>
    str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (fl) => fl.toUpperCase())
      .replace(/\W+/g, '');

  const toCamelCase = (str) =>
    toPascalCase(str).replace(/^./, (firstLetter) => firstLetter.toLowerCase());

  return {
    userInputs: [
      {
        title: 'Component page name',
        argumentName: 'name',
        defaultValue: 'Sample',
      },
    ],
    template: [
      {
        type: 'folder',
        name: (inputs) => `${toPascalCase(inputs.name)}`,
        children: [
          {
            type: 'file',
            name: 'index.ts',
            content: (inputs) => `import { ${toPascalCase(
              inputs.name
            )}Controller } from './controller';

export { ${toPascalCase(inputs.name)}Controller };
`,
          },
          {
            type: 'file',
            name: (inputs) => `${toCamelCase(inputs.name)}.error.tsx`,
            content: (inputs) => `/**
* Componente de indicador de erro.
*
* Este componente é exibido quando ocorre um erro durante o carregamento dos dados na página.
*
* @returns Retorna o componente de indicador de erro.
*/
export function ${toPascalCase(inputs.name)}Error() {
  return (
    <div>
      <h1>${toPascalCase(inputs.name)}Error</h1>
    </div>
  );
}
`,
          },
          {
            type: 'file',
            name: (inputs) => `${toCamelCase(inputs.name)}.controller.tsx`,
            content: (
              inputs
            ) => `import { ${toPascalCase(inputs.name)}Empty } from './${toCamelCase(inputs.name)}.empty';
import { ${toPascalCase(inputs.name)}Error } from './${toCamelCase(inputs.name)}.error';
import { use${toPascalCase(inputs.name)}Hook } from './${toCamelCase(inputs.name)}.hook';
import { ${toPascalCase(inputs.name)}Loading } from './${toCamelCase(inputs.name)}.loading';
import { ${toPascalCase(inputs.name)}View } from './${toCamelCase(inputs.name)}.view';

/**
 * Componente que controla a lógica da página de exemplo.
 *
 * Este componente gerencia o estado da página de exemplo, lidando com casos de carregamento, erro e dados vazios.
 * Ele utiliza o hook use${toPascalCase(inputs.name)}Hook para obter os dados e o estado da página.
 *
 * As propriedades necessárias para renderizar a view são encaminhadas no controller. E devem ser definidas
 * dentro do componente de view.
 *
 * @returns Retorna o componente da página de exemplo.
 */
export function ${toPascalCase(inputs.name)}Controller() {
  const { pageStatus, state } = use${toPascalCase(inputs.name)}Hook();

  const { isError, isLoading, noData } = pageStatus;

  if (isLoading) {
    return <${toPascalCase(inputs.name)}Loading />;
  }

  if (isError) {
    return <${toPascalCase(inputs.name)}Error />;
  }

  if (noData) {
    return <${toPascalCase(inputs.name)}Empty />;
  }

  return <${toPascalCase(inputs.name)}View data={state} />;
}

`,
          },
          {
            type: 'file',
            name: (inputs) => `${toCamelCase(inputs.name)}.layout.tsx`,
            content: (inputs) => `import React from 'react';

interface ${toPascalCase(inputs.name)}LayoutProps {
  children: React.ReactNode;
}

/**
 * Componente de layout para a página inteira.
 *
 * Este componente é responsável por fornecer um layout consistente para toda a página.
 * Qualquer conteúdo definido dentro deste componente será carregado para a página inteira,
 * independente do estado de carregamento, erro ou dados vazios da página.
 *
 * @returns Retorna o componente de layout para a página inteira.
 */
export function ${toPascalCase(inputs.name)}Layout(props: ${toPascalCase(inputs.name)}LayoutProps) {
  const { children } = props;

  return (
    <div>
      ${toPascalCase(inputs.name)} layout
      {children}
    </div>
  );
}

`,
          },
          {
            type: 'file',
            name: (inputs) => `${toCamelCase(inputs.name)}.loading.tsx`,
            content: (inputs) => `/**
 * Componente de indicador de carregamento.
 *
 * Este componente é exibido enquanto os dados estão sendo carregados na página.
 *
 * @returns Retorna o componente de indicador de carregamento.
 */
export function ${toPascalCase(inputs.name)}Loading() {
  return (
    <div>
      <h1>${toPascalCase(inputs.name)}Loading</h1>
    </div>
  );
}
`,
          },
          {
            type: 'file',
            name: (inputs) => `${toCamelCase(inputs.name)}.tsx`,
            content: (
              inputs
            ) => `import { ${toPascalCase(inputs.name)}Controller } from './${toCamelCase(inputs.name)}.controller';
import { ${toPascalCase(inputs.name)}Layout } from './${toCamelCase(inputs.name)}.layout';

export function ${toPascalCase(inputs.name)}() {
  return (
    <${toPascalCase(inputs.name)}Layout>
      <${toPascalCase(inputs.name)}Controller />
    </${toPascalCase(inputs.name)}Layout>
  );
}
`,
          },
          {
            type: 'file',
            name: (inputs) => `${toCamelCase(inputs.name)}.empty.tsx`,
            content: (inputs) => `/**
* Componente de indicador de dados vazios.
*
* Este componente é exibido quando não há dados disponíveis para serem mostrados na página.
*
* @returns Retorna o componente de indicador de dados vazios.
*/
export function ${toPascalCase(inputs.name)}Empty() {
  return (
    <div>
      <h1>${toPascalCase(inputs.name)}Empty</h1>
    </div>
  );
}
`,
          },
          {
            type: 'file',
            name: (inputs) => `${toCamelCase(inputs.name)}.hook.ts`,
            content: (inputs) => `import { useState } from 'react';

import { ReturnHookPage } from '@godiet-utils/types';

/**
 * Define o formato de saída do hook \`use${toPascalCase(inputs.name)}Hook\`.
 *
 * Este tipo descreve a estrutura dos dados de saída retornados pelo hook \`use${toPascalCase(inputs.name)}Hook\`.
 *
 * @interface ${toPascalCase(inputs.name)}HookOutput
 */
interface ${toPascalCase(inputs.name)}HookOutput {
  state: number;
}

/**
 * Hook customizado que gerencia a lógica da página de exemplo.
 *
 * Este hook é responsável por gerenciar o estado da página de exemplo, incluindo o estado interno e o status da página.
 *
 * @returns Retorna um objeto contendo o estado interno e o status da página.
 */
export function use${toPascalCase(inputs.name)}Hook(): ReturnHookPage<${toPascalCase(inputs.name)}HookOutput> {
  const [state] = useState(0);

  return {
    state,
    pageStatus: {
      isLoading: false,
      isError: false,
      noData: true,
    },
  };
}
`,
          },
          {
            type: 'file',
            name: (inputs) => `${toCamelCase(inputs.name)}.view.tsx`,
            content: (inputs) => `
/**
 * Interface que define as propriedades aceitas pelo componente \`${toPascalCase(inputs.name)}View\`.
 *
 * Este tipo de dados descreve as propriedades que podem ser passadas para o componente \`${toPascalCase(inputs.name)}View\`.
 *
 * @interface ${toPascalCase(inputs.name)}ViewProps
 */
export interface ${toPascalCase(inputs.name)}ViewProps {
  data: number;
}

/**
 * Esse componente representa a view da página de exemplo.
 * @param props - As propriedades são definidas dentro do ${toPascalCase(inputs.name)}ViewProps. E são encaminhadas para o componente dentro do ${toPascalCase(inputs.name)}Controller.
 * @returns Retorna o componente da view.
 */
export function ${toPascalCase(inputs.name)}View(props: ${toPascalCase(inputs.name)}ViewProps) {
  const { data } = props;

  return (
    <div>
      <h1>${toPascalCase(inputs.name)} view</h1>
      {data}
    </div>
  );
}


`,
          },
          {
            type: 'file',
            name: (inputs) => `${toCamelCase(inputs.name)}.spec.tsx`,
            content: (inputs) =>
              `import {
  render,
  renderHook,
  ReturnRenderHookType,
  ReturnRenderType,
} from '@testing-react';
import { clearAllMocks } from '@testing-suit';

import { use${toPascalCase(inputs.name)}Hook } from './${toCamelCase(inputs.name)}.hook';
import { ${toPascalCase(inputs.name)}View } from './${toCamelCase(inputs.name)}.view';

describe('${toPascalCase(inputs.name)}Page' ,() => {
  afterEach(() => {
    clearAllMocks();
  });

  describe('View', () => {
    let rendered: ReturnRenderType;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should render the view with default props', () => {
      // Arrange

      // Act
      rendered = render(<${toPascalCase(inputs.name)}View data={0} />);

      // Assert
      expect(rendered.getByText('${toPascalCase(inputs.name)} view'));
    });
  })

  describe('Hook', () => {
    let rendered: ReturnRenderHookType<typeof use${toPascalCase(inputs.name)}Hook>;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should render the hook with default props', () => {
      // Arrange

      // Act
      rendered = renderHook(() => use${toPascalCase(inputs.name)}Hook());

      // Assert
      expect(rendered.result.current.state).toEqual(0);
    });
  })
})
`,
          },
        ],
      },
    ],
  };
});
