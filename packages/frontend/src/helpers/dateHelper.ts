export const dateHelperFormat = (date: Date): string => {
	const day =
		(date.getDate() + 1).toLocaleString().length > 1
			? date.getDate().toLocaleString()
			: `0${date.getDate()}`;

	const month = date.getMonth();

	return `${day}-${
		month.toString().length > 1 ? month : "0" + month
	}-${date.getFullYear()}`;
};

export const dateHelperFormatProper = (date: Date): string => {
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"July",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const dayNames = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	];

	const day =
		date.getDate().toString().length > 1
			? date.getDate().toString()
			: `0${date.getDate()}`;

	const month = monthNames[date.getMonth() + 1];

	return `${day}-${month}-${date.getFullYear()}, ${dayNames[date.getDay() - 1]}`;
};
