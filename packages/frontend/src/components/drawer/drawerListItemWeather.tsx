import { WbSunny } from "@mui/icons-material";
import { ListItem, ListItemText, Typography, ListItemIcon } from "@mui/material";
import { yellow } from "@mui/material/colors";
import { useAxios } from "hooks/useAxios";
import { useEffect, useState } from "react";
import { OpenWeatherResponse } from "types";
import { URL_OPEN_WEATHER } from "utils/constants";

export const DrawerListItemWeather = (): JSX.Element => {
	const [weatherStats, setWeatherStats] = useState<OpenWeatherResponse | undefined>(
		undefined
	);

	const {
		data: weatherData,
		loading: weatherLoading,
		success: weatherSuccess,
		error: weatherError,
		fetch: weatherFetch,
	} = useAxios<OpenWeatherResponse>(URL_OPEN_WEATHER);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			weatherFetch({
				method: "GET",
				dontLogoutOnAuthError: true,
				params: {
					lat: position.coords.latitude,
					lon: position.coords.longitude,
					units: "metric",
					appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
				},
			});
		});
	}, []);

	useEffect(() => {
		if (!weatherLoading && weatherSuccess && weatherData) {
			setWeatherStats(weatherData);
		}
	}, [weatherData, weatherLoading, weatherSuccess, weatherError]);

	return (
		<>
			{weatherStats && (
				<>
					<ListItem>
						<ListItemText>
							<Typography variant="caption" noWrap letterSpacing={1}>
								{`${
									weatherStats?.main?.temp ? Math.round(weatherStats.main.temp) + "C" : ""
								}, Feels like ${
									weatherStats?.main?.feels_like
										? Math.round(weatherStats.main.feels_like) + "C"
										: ""
								}`}
							</Typography>
						</ListItemText>

						<ListItemIcon>
							<WbSunny htmlColor={yellow[600]} />
						</ListItemIcon>
					</ListItem>

					<ListItem>
						<ListItemText>
							<Typography variant="caption" noWrap letterSpacing={1}>
								{weatherStats?.name + ", " + weatherStats?.sys?.country}
							</Typography>
						</ListItemText>
					</ListItem>
				</>
			)}
		</>
	);
};
