export const getDocumentCSS = (): string => {
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
