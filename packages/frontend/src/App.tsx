import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { Routing } from "./components";
import { useEffect } from "react";

const App = (): JSX.Element => {
	useEffect(() => {
		console.log("App rendered");
	}, []);
	return (
		<ThemeProvider theme={theme}>
			<Routing />
		</ThemeProvider>
	);
};

export default App;
