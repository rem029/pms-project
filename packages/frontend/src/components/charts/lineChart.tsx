import { useRef } from "react";
import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";
import { Box } from "@mui/material";

HighchartsExporting(Highcharts);

export const LineChart = (): JSX.Element => {
	const highchartsRef = useRef<HighchartsReact.RefObject>(null);
	const options: Highcharts.Options = {
		title: { text: "Line chart" },
		series: [{ type: "line", data: [1, 2, 3] }],
	};

	return (
		<Box component="div">
			<HighchartsReact ref={highchartsRef} highcharts={Highcharts} options={options} />
		</Box>
	);
};
