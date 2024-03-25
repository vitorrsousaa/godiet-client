(function Template() {
  const toPascalCase = (str) =>
    str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (fl) => fl.toUpperCase())
      .replace(/\W+/g, '');

  const toCamelCase = (str) =>
    toPascalCase(str).replace(/^./, (firstLetter) => firstLetter.toLowerCase());

  const toKebabCase = (str) =>
    str
      .replace(/([a-z])([A-Z])/g, '$1-$2') // Adiciona um hífen entre letras minúsculas e maiúsculas
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .toLowerCase();

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
            )}, ${toPascalCase(
              inputs.name
            )}Props } from './${toKebabCase(inputs.name)}';

export { ${toPascalCase(inputs.name)} };
export type { ${toPascalCase(inputs.name)}Props };
  `,
          },
          {
            type: 'file',
            name: (inputs) => `${toKebabCase(inputs.name)}.tsx`,
            content: (
              inputs
            ) => `import { use${toPascalCase(inputs.name)}Hook } from './${toKebabCase(inputs.name)}.hook';

export interface ${toPascalCase(inputs.name)}Props {
  data: string;
}

export function ${toPascalCase(inputs.name)}(props: ${toPascalCase(inputs.name)}Props) {
  const { data } = props;

  const { state } = use${toPascalCase(inputs.name)}Hook(props);
  return (
    <div>
      <h1>${toPascalCase(inputs.name)}</h1>
      {data} {state}
    </div>
  );
}
`,
          },
          {
            type: 'file',
            name: (inputs) => `${toKebabCase(inputs.name)}.hook.ts`,
            content: (inputs) => `import React from 'react';

import { ${toPascalCase(inputs.name)}Props } from './${toKebabCase(inputs.name)}';

export function use${toPascalCase(inputs.name)}Hook(props: ${toPascalCase(inputs.name)}Props) {
  const { data } = props;

  const [state] = React.useState(data);

  return {
    state,
  };
}

`,
          },
          {
            type: 'file',
            name: (inputs) => `${toKebabCase(inputs.name)}.spec.tsx`,
            content: (inputs) => `
import {
  render,
  renderHook,
  ReturnRenderHookType,
  ReturnRenderType,
} from '@testing-react';
import { clearAllMocks } from '@testing-suit';

import { ${toPascalCase(inputs.name)}, ${toPascalCase(inputs.name)}Props } from './${toKebabCase(inputs.name)}';
import { use${toPascalCase(inputs.name)}Hook } from './${toKebabCase(inputs.name)}.hook';

describe('${toPascalCase(inputs.name)}', () => {
  beforeEach(() => {
    clearAllMocks();
  });

  describe('render', () => {
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
      rendered = render(<${toPascalCase(inputs.name)} data={'0'} />);

      // Assert
      expect(rendered.getByText('${toPascalCase(inputs.name)}'));
    });
  });

  describe('hook', () => {
    let rendered: ReturnRenderHookType<typeof use${toPascalCase(inputs.name)}Hook>;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should render the hook with default props', () => {
      // Arrange
      const props: ${toPascalCase(inputs.name)}Props = {
        data: 'teste',
      };

      // Act
      rendered = renderHook(() => use${toPascalCase(inputs.name)}Hook(props));

      // Assert
      expect(rendered.result.current.state).toEqual('teste');
    });
  });
});
`,
          },
        ],
      },
    ],
  };
});
