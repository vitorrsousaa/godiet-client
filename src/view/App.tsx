import { Router } from '@godiet-components/Router';
import { ThemeProvider } from '@godiet-components/ThemeProvider';
import { AuthProvider } from '@godiet-contexts/auth';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Router />

          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
