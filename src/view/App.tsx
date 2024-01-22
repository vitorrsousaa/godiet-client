import { Router } from '@godiet-components/Router';
import { ThemeProvider } from '@godiet-components/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

export default App;
