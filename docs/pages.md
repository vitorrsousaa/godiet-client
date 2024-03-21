## Componente SampleController

O componente SampleController gerencia a lógica da página de exemplo. Ele cuida dos casos de carregamento, erro e dados vazios, utilizando o hook useSampleHook para obter os dados e o estado da página.

### Uso

```
import { SampleController } from './SampleController';

const App = () => {
  return (
    <div>
      <SampleController />
    </div>
  );
}

export default App;
```

### Descrição

Este componente exibe diferentes conteúdos com base no estado da página:

Se a página estiver carregando, ele exibe o componente SampleLoading.
Se ocorrer um erro, ele exibe o componente SampleError.
Se não houver dados para mostrar, ele exibe o componente SampleEmpty.
Caso contrário, ele exibe o componente SampleView.

### Props

Nenhuma propriedade é esperada.

## Componente SampleEmpty

O componente SampleEmpty é exibido quando não há dados disponíveis para serem mostrados na página de exemplo.

### Uso

```
import { SampleEmpty } from './SampleEmpty';

const SamplePage = () => {
  return (
    <div>
      <SampleEmpty />
    </div>
  );
}

export default SamplePage;

```

### Descrição

Este componente fornece uma mensagem indicando que não há dados disponíveis para serem mostrados na página de exemplo. É útil quando não há dados a serem exibidos.

### Props

Nenhuma propriedade é esperada.

## Componente SampleLoading

O componente SampleLoading é exibido enquanto os dados estão sendo carregados na página de exemplo.

## Uso

```
import { SampleLoading } from './SampleLoading';

const SamplePage = () => {
  return (
    <div>
      <SampleLoading />
    </div>
  );
}

export default SamplePage;
```

### Descrição

Este componente fornece uma animação ou mensagem de carregamento para indicar ao usuário que os dados estão sendo carregados. É útil para manter os usuários informados sobre o progresso do carregamento.

### Props

Nenhuma propriedade é esperada.

## Componente SampleError

O componente SampleError é exibido quando ocorre um erro durante o carregamento dos dados na página de exemplo.

### Uso

```
import { SampleError } from './SampleError';

const SamplePage = () => {
  return (
    <div>
      <SampleError />
    </div>
  );
}

export default SamplePage;
```

### Descrição

Este componente fornece uma mensagem de erro para informar ao usuário que ocorreu um problema durante o carregamento dos dados. É útil para ajudar os usuários a entenderem por que os dados não foram carregados corretamente.

### Props

Nenhuma propriedade é esperada.
