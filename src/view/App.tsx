import { AuthProvider } from '@godiet-contexts/auth';
import { QueryClientProvider } from '@godiet-query';
import { Router } from '@godiet-ui/Router';
import { ThemeProvider } from '@godiet-ui/ThemeProvider';

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
