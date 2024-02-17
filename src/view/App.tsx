import { AuthProvider } from '@godiet-contexts/auth';
import { QueryClientProvider } from '@godiet-query';
import { Router } from '@godiet-ui/Router';
import { ThemeProvider } from '@godiet-ui/ThemeProvider';

import { Toaster } from 'react-hot-toast';
import { clarity } from 'react-microsoft-clarity';

const { DEV: IS_DEVELOPMENT } = import.meta.env;

function App() {
  if (!IS_DEVELOPMENT) {
    clarity.init('l3dsncrb0t');
  }

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
