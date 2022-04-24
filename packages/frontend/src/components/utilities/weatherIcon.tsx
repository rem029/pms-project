import { AcUnit, WbSunny } from "@mui/icons-material";
import { getCSSTempColor } from "helpers/cssHelper";
import { useMemo } from "react";

export const WeatherIcon = (props: { temperature: number }): JSX.Element => {
	const { temperature } = props;

	const iconDisplay = useMemo(() => {
		const color = getCSSTempColor(temperature);

		if (temperature <= 0) return <AcUnit htmlColor={color} />;
		if (temperature >= 0 && temperature < 25) return <AcUnit htmlColor={color} />;
		else return <WbSunny htmlColor={color} />;
	}, [temperature]);

	return <>{iconDisplay}</>;
};
