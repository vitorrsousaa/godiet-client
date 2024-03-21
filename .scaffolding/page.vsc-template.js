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
            content: (
              inputs
            ) => `export function ${toPascalCase(inputs.name)}Error() {
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
            name: (inputs) => `${toCamelCase(inputs.name)}.loading.tsx`,
            content: (
              inputs
            ) => `export function ${toPascalCase(inputs.name)}Loading() {
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
            name: (inputs) => `${toCamelCase(inputs.name)}.empty.tsx`,
            content: (
              inputs
            ) => `export function ${toPascalCase(inputs.name)}Empty() {
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

export function use${toPascalCase(inputs.name)}Hook() {
  const [state] = useState();

  return {
    state,
    isLoading: false,
    isError: false,
  }
}
`,
          },

          {
            type: 'file',
            name: (inputs) => `${toCamelCase(inputs.name)}.spec.tsx`,
            content: (inputs) =>
              `import { AppError } from '@/errors'
import { IRequest } from '@/interfaces/http';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@/tests';

import { ${toPascalCase(inputs.name)}Controller } from './controller';

describe('${toPascalCase(inputs.name)}Controller', () => {
  let mockRequest: IRequest
  let controller: ${toPascalCase(inputs.name)}Controller;

  let spy = {
    'service.execute': {} as SpyInstance<any>,
  }

  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
      accountId: '',
    } as IRequest;

    const service = {
      execute: fn(),
    } as unknown;

    spy = {
      'service.execute': spyOn(service, 'execute'),
    }

    controller = new ${toPascalCase(inputs.name)}Controller(service);
  });

  afterEach(() => {
    clearAllMocks();
    mockRequest.body = {};
  })

  it('Should throw error when account id is not provided', async () => {
    // Arrange

    // Act
    const response = await controller.handle(mockRequest);

    // Assert
    expect(response).toEqual({
      statusCode: 400,
      body: {
        error: 'User not found',
      },
    });
  });

  it('Should throw error when is called with incorrect schema ', async () => {
    // Arrange
    mockRequest.accountId = 'account_id';
    // Includes all fields that are required
    mockRequest.patientId = 'cc4c275f-923b-4b6c-b3e1-952b30f88f42';

    // Act
    const response = await controller.handle(mockRequest);

    // Assert
    expect(response).toEqual({
      statusCode: 422,
      body: [
        {
          field: 'userId',
          message: 'Invalid uuid',
        },
      ],
    });
  });

  it('Should throw error when service throw unknown error', async () => {
    // Arrange
    mockRequest.accountId = '4b429c9e-7562-421a-9aa9-669e1b380b7a';
    spy['service.execute'].mockRejectedValue('Incorrect Error');
    // Includes all fields that are required
    mockRequest.patientId = 'cc4c275f-923b-4b6c-b3e1-952b30f88f42';

    // Act
    const response = await controller.handle(mockRequest);

    // Assert
    expect(response).toEqual({
      statusCode: 500,
      body: {
        error: 'Internal server error',
      },
    });
  });

  it('Should throw error when service throw app error', async () => {
    // Arrange
    mockRequest.accountId = '4b429c9e-7562-421a-9aa9-669e1b380b7a';
    spy['service.execute'].mockRejectedValue(
      new AppError('Incorrect Error', 400)
    );
    // Includes all fields that are required
    mockRequest.patientId = 'cc4c275f-923b-4b6c-b3e1-952b30f88f42';

    // Act
    const response = await controller.handle(mockRequest);

    // Assert
    expect(response).toEqual({
      statusCode: 400,
      body: {
        error: 'Incorrect Error',
      },
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
