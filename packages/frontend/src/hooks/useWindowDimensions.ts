import { useState, useEffect } from "react";

export interface WindowDimensionInterface {
	width: number;
	height: number;
}

const getWindowDimensions = (): WindowDimensionInterface => {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
};

export const useWindowDimensions = (): WindowDimensionInterface => {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

	useEffect(() => {
		function handleResize(): void {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
};
