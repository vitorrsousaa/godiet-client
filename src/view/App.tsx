import { Router } from '@godiet-components/Router';
import { ThemeProvider } from '@godiet-components/ThemeProvider';
import { AuthProvider } from '@godiet-contexts/auth';
import { QueryClientProvider } from '@godiet-query';

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <QueryClientProvider>
      <AuthProvider>
        <ThemeProvider>
          <Router />

          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
