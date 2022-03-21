import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';

import { Login } from './components/login';
import { Home } from 'pages/home';
import { NotFound } from 'pages/notFound';

import { ProtectedRoutes } from 'components/utilities/protectedRoute';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
