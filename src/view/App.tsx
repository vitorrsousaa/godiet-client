import { Router } from '@godiet-components/Router';
import { ThemeProvider } from '@godiet-components/ThemeProvider';
import { AuthProvider } from '@godiet-contexts/auth';
import { QueryClientProvider } from '@godiet-query';

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider>
          <Router />

          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
