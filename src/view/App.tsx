import { Router } from '@godiet-components/Router';
import { ThemeProvider } from '@godiet-components/ThemeProvider';
import { AuthProvider } from '@godiet-contexts/auth';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
