import { blue, green, red, yellow } from "@mui/material/colors";

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
	if (valueRounded > 50 && valueRounded < 100) return blue[backgroundOpacity];
	if (valueRounded === 100) return green[backgroundOpacity];

	return "primary";
};
