# goDiet - Client

<h2 id="started">📌 Sobre</h2>

Descrição breve sobre o client.

Nós utilizamos Eslint, Prettier, editorconfig e um StyleGuide integrations com formatação automática. Por favor, baixe essas extensões no seu editor de código.

1. [ESLint](https://github.com/Microsoft/vscode-eslint)
1. [Prettier](https://github.com/prettier/prettier-vscode)
1. [Editor config](https://github.com/editorconfig/editorconfig-vscode)

> Para ter certeza que o Prettier formata ao salvar. Adicione `"editor.formatOnSave": true` nas configurações pessoais do seu VSCode.

## 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: <br />
→ [Git](https://git-scm.com);<br />
→ [Node.js](https://nodejs.org/en/);<br />
→ [Docker](https://www.docker.com/); <br />

## 🎲 Rodando a aplicação

Este projeto é divido em duas partes:

1. Backend
2. Frontend Web

💡 O Frontend precisa que o Backend esteja sendo executado para funcionar.

As instruções para inicializar a parte Backend do projeto encontram-se no repositório do Backend.

### Clonado o repositório

```bash
# Clone este repositório
$ git clone

# Vá para a pasta da aplicação Front
$ cd godiet-client

# Instale as dependências
yarn install

# Rode a aplicação
yarn start
# A aplicação será aberta na porta:5173 - acesse http://localhost:5173
```

### Configurando variáveis de ambiente

Adicione na pasta raíz um arquivo `.env`, de acordo com o `env.example` deste repositório.

## ⚙️ Executando os testes

Explicar como executar os testes automatizados para este sistema.

### 🔩 Analise os testes de ponta a ponta

Explique que eles verificam esses testes e porquê.

```bash
# run tests with coverage
$ yarn test

# run tests and open vitest ui
$ yarn test:ui
```

### Testes de integração

Por padrão, o container do ambiente de testes vai ser criado na porta definida no `env`. Através da propriedade `DATABASE_TEST_URL`.

```bash
# run tests integration
$ yarn test:int

# run tests and open vitest ui
$ yarn test:int:ui
```

## Deployment

Podemos realizar o deploy em dois stages.

```bash
# Deploy stage prod
$ yarn deployment
```

Antes de realizar o deploy, deve-se configurar as variáveis de ambiente utilizando o arquivo `.env`. Siga como exemplo o `.env.example`, e crie um arquivo para cada stage do deploy. Assim como o exemplo abaixo:

```bash
# Environment stage dev
(.env.dev)
AUTH_SECRET='SECRET_DEV'
```

```bash
# Environment stage prod
(.env.prod)
AUTH_SECRET='SECRET_PROD'
```
