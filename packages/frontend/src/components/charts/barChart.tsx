import { useRef } from "react";
import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";
import { Box } from "@mui/material";

HighchartsExporting(Highcharts);

export const BarChart = (): JSX.Element => {
	const highchartsRef = useRef<HighchartsReact.RefObject>(null);
	const options: Highcharts.Options = {
		chart: {
			type: "bar",
		},
		title: {
			text: "Bar Chart",
		},
		subtitle: {
			text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>',
		},
		xAxis: {
			categories: ["Data 1", "Data 2", "Data 3", "Data 4", "Data 5"],
			title: {
				text: null,
			},
		},
		yAxis: {
			min: 0,
			title: {
				text: "Population (millions)",
				align: "high",
			},
			labels: {
				overflow: "justify",
			},
		},
		tooltip: {
			valueSuffix: " millions",
		},
		plotOptions: {
			bar: {
				dataLabels: {
					enabled: true,
				},
			},
		},
		legend: {
			layout: "vertical",
			align: "right",
			verticalAlign: "top",
			x: -40,
			y: 80,
			floating: true,
			borderWidth: 1,
			backgroundColor: "#FFFFFF",
			shadow: true,
		},
		credits: {
			enabled: false,
		},
		series: [
			{
				type: "bar",
				name: "Bar 1",
				data: [107, 31, 635, 203, 2],
			},
			{
				type: "bar",
				name: "Bar 2",
				data: [133, 156, 947, 408, 6],
			},
			{
				type: "bar",
				name: "Bar 3",
				data: [814, 841, 3714, 727, 31],
			},
			{
				type: "bar",
				name: "Bar 4",
				data: [1216, 1001, 4436, 738, 40],
			},
		],
	};

	return (
		<Box component="div">
			<HighchartsReact ref={highchartsRef} highcharts={Highcharts} options={options} />
		</Box>
	);
};
