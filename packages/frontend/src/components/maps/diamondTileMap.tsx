import { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsHeatMap from "highcharts/modules/heatmap";
import HighchartsTileMap from "highcharts/modules/tilemap";
import HighchartsReact from "highcharts-react-official";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { Paper } from "@mui/material";
import { blue, green, red, yellow } from "@mui/material/colors";

HighchartsHeatMap(Highcharts);
HighchartsTileMap(Highcharts);
HighchartsExporting(Highcharts);

export const DiamondTileMap = (): JSX.Element => {
	const highchartsRef = useRef<HighchartsReact.RefObject>(null);
	const { width } = useWindowDimensions();

	useEffect(() => {
		highchartsRef.current?.chart.redraw();
	}, [width]);

	const options: Highcharts.Options = {
		chart: {
			type: "tilemap",
			events: {
				click: (e) => {
					alert("chart clicked");
					console.log("chart clicked", e);
				},
			},
		},

		title: {
			text: "Building progress",
		},

		subtitle: {
			text: "Edit subtitle",
		},

		xAxis: {
			visible: false,
		},

		yAxis: {
			visible: false,
		},

		colorAxis: {
			dataClasses: [
				{
					from: 0,
					to: 0,
					color: red[400],
					name: "0%",
				},
				{
					from: 1,
					to: 50,
					color: yellow[400],
					name: "1% to 50%",
				},
				{
					from: 51,
					to: 99,
					color: blue[400],
					name: "51% to 75%",
				},
				{
					from: 100,
					to: 100,
					color: green[400],
					name: "100%",
				},
			],
		},

		tooltip: {
			headerFormat: "",
			pointFormat:
				"The current progress of <b> {point.label}</b> is at <b>{point.value}%</b>",
		},

		plotOptions: {
			series: {
				dataLabels: [
					{
						enabled: true,
						format: "{point.label}",
						color: "#000000",
					},
				],
			},
		},

		series: [
			{
				type: "tilemap",
				tileShape: "square",
				events: {
					click: (e) => {
						alert(
							"Building progress " +
								e.point.options.label +
								" at " +
								e.point.options.value +
								"%"
						);
						console.log("series clicked", e.point.options);
					},
				},
				data: [
					{
						label: "B1101",
						name: "B1101",
						x: 1,
						y: 1,
						value: Math.floor(Math.random() * 100),
						text: "text here",
						title: "title here",
					},
					{
						label: "B1102",
						name: "B1102",
						x: 1,
						y: 2,
						value: Math.floor(Math.random() * 100),
						text: "text here",
						title: "title here",
					},
					{
						label: "B1103",
						name: "B1103",
						x: 1,
						y: 3,
						value: Math.floor(Math.random() * 100),
						text: "text here",
						title: "title here",
					},
					{
						label: "B2201",
						name: "B2201",
						x: 2,
						y: 1,
						value: Math.floor(Math.random() * 100),
						text: "text here",
						title: "title here",
					},
					{
						label: "B2202",
						name: "B2202",
						x: 2,
						y: 2,
						value: Math.floor(Math.random() * 100),
						text: "text here",
						title: "title here",
					},
					{
						label: "B2203",
						name: "B2203",
						x: 2,
						y: 3,
						value: Math.floor(Math.random() * 100),
						text: "text here",
						title: "title here",
					},
					{
						label: "B3301",
						name: "B3301",
						x: 3,
						y: 1,
						value: Math.floor(Math.random() * 100),
						text: "text here",
						title: "title here",
					},
					{
						label: "B3302",
						name: "B3302",
						x: 3,
						y: 2,
						value: Math.floor(Math.random() * 100),
						text: "text here",
						title: "title here",
					},
					{
						label: "B3303",
						name: "B3303",
						x: 3,
						y: 3,
						value: Math.floor(Math.random() * 100),
						text: "text here",
						title: "title here",
					},
				],
			},
		],
	};

	return (
		<Paper sx={{ flexGrow: 1, padding: 1, mt: 0.5 }} elevation={3}>
			<HighchartsReact ref={highchartsRef} highcharts={Highcharts} options={options} />
		</Paper>
	);
};
