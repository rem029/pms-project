import { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { Paper } from "@mui/material";

HighchartsExporting(Highcharts);

export const LineChart = (): JSX.Element => {
	const highchartsRef = useRef<HighchartsReact.RefObject>(null);
	const { width } = useWindowDimensions();

	useEffect(() => {
		highchartsRef.current?.chart.redraw();
	}, [width]);

	const options: Highcharts.Options = {
		chart: { reflow: true },
		title: { text: "Line chart" },
		series: [{ type: "areaspline", data: [0, 1, 3, 0, 3, 1, 2, 3, 1, 0] }],
	};

	return (
		<Paper sx={{ flexGrow: 1, padding: 1, mt: 0.5 }} elevation={3}>
			<HighchartsReact ref={highchartsRef} highcharts={Highcharts} options={options} />
		</Paper>
	);
};
