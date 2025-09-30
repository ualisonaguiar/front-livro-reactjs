import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './components/Authenticator/AuthContext.tsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
)
