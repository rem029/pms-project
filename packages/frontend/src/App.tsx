import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { Routing } from "./components";

const App = (): JSX.Element => {
	return (
		<ThemeProvider theme={theme}>
			<Routing />
		</ThemeProvider>
	);
};

export default App;
