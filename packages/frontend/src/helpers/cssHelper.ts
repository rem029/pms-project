import { blue, green, orange, red, yellow } from "@mui/material/colors";

export const getCSSDocument = (): string => {
	const styleSheetList = document.styleSheets;
	let allCSSStyle = "";

	for (const styleSheet in styleSheetList) {
		try {
			for (const cssRules in styleSheetList[styleSheet].cssRules) {
				const cssString = styleSheetList[styleSheet].cssRules[cssRules].cssText;

				if (cssString) allCSSStyle = `${allCSSStyle}\n${cssString}`;
			}
		} catch (error) {
			console.log("No access error with styleSheet");
		}
	}

	return allCSSStyle;
};

export const getCSSReportColor = (value: number): string => {
	//100% green
	//75-99% blue
	//50-75% orange
	//1-50% yellow
	//0% red

	const valueRounded = Math.round(value);
	const backgroundOpacity = 400;

	if (valueRounded <= 0) return red[backgroundOpacity];
	if (valueRounded >= 1 && valueRounded < 50) return yellow[backgroundOpacity];
	if (valueRounded >= 50 && valueRounded < 75) return orange[backgroundOpacity];
	if (valueRounded > 75 && valueRounded < 100) return blue[backgroundOpacity];
	if (valueRounded === 100) return green[backgroundOpacity];

	return "primary";
};

export const getCSSTempColor = (value: number): string => {
	// Cold ACUnit
	// Neutral WbSunnyC
	// Hot WbSunnyC

	const valueRounded = Math.round(value);

	if (valueRounded <= 0) return blue[50];
	if (valueRounded >= 0 && valueRounded < 10) return blue[100];
	if (valueRounded >= 10 && valueRounded < 20) return blue[200];
	if (valueRounded >= 20 && valueRounded < 25) return blue[500];
	if (valueRounded >= 25 && valueRounded < 30) return orange[100];
	if (valueRounded >= 30 && valueRounded < 40) return orange[500];
	if (valueRounded >= 40 && valueRounded < 50) return red[200];
	if (valueRounded > 50) return red[700];

	return "primary";
};
