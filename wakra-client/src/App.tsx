import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';

import { Login } from './components/login';

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );
};

export default App;
