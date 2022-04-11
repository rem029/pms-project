import { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsHistogram from "highcharts/modules/histogram-bellcurve";
import HighchartsReact from "highcharts-react-official";
import { Paper } from "@mui/material";
import { useWindowDimensions } from "hooks/useWindowDimensions";

const dummyData = [
	3.5, 3, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3, 3, 4, 4.4, 3.9, 3.5, 3.8,
	3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5,
	3.6, 3, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3, 3.8, 3.2, 3.7, 3.3, 3.2, 3.2, 3.1, 2.3, 2.8,
	2.8, 3.3, 2.4, 2.9, 2.7, 2, 3, 2.2, 2.9, 2.9, 3.1, 3, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8,
	2.9, 3, 2.8, 3, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3, 3.4, 3.1, 2.3, 3, 2.5, 2.6, 3, 2.6,
	2.3, 2.7, 3, 2.9, 2.9, 2.5, 2.8, 3.3, 2.7, 3, 2.9, 3, 3, 2.5, 2.9, 2.5, 3.6, 3.2, 2.7,
	3, 2.5, 2.8, 3.2, 3, 3.8, 2.6, 2.2, 3.2, 2.8, 2.8, 2.7, 3.3, 3.2, 2.8, 3, 2.8, 3, 2.8,
	3.8, 2.8, 2.8, 2.6, 3, 3.4, 3.1, 3, 3.1, 3.1, 3.1, 2.7, 3.2, 3.3, 3, 2.5, 3, 3.4, 3,
];

HighchartsHistogram(Highcharts);
HighchartsExporting(Highcharts);

export const HistogramChart = (): JSX.Element => {
	const highchartsRef = useRef<HighchartsReact.RefObject>(null);
	const { width } = useWindowDimensions();

	useEffect(() => {
		highchartsRef.current?.chart.redraw();
	}, [width]);

	const options: Highcharts.Options = {
		chart: { reflow: true },
		title: {
			text: "Histogram Chart",
		},

		xAxis: [
			{
				title: { text: "Data" },
				alignTicks: false,
			},
			{
				title: { text: "Histogram" },
				alignTicks: false,
				opposite: true,
			},
		],

		yAxis: [
			{
				title: { text: "Data" },
			},
			{
				title: { text: "Histogram" },
				opposite: true,
			},
		],

		plotOptions: {
			histogram: {
				accessibility: {
					point: {
						valueDescriptionFormat:
							"{index}. {point.x:.3f} to {point.x2:.3f}, {point.y}.",
					},
				},
			},
		},

		series: [
			{
				name: "Histogram",
				type: "histogram",
				xAxis: 1,
				yAxis: 1,
				baseSeries: "s1",
				zIndex: -1,
			},
			{
				name: "Data",
				type: "scatter",
				data: dummyData,
				id: "s1",
				marker: {
					radius: 1.5,
				},
				visible: false,
			},
		],
	};

	return (
		<Paper sx={{ flexGrow: 1, padding: 1, mt: 0.5 }} elevation={3}>
			<HighchartsReact ref={highchartsRef} highcharts={Highcharts} options={options} />
		</Paper>
	);
};
