export const formatDate = (date: Date): string => {
	// const months = [
	// 	"Jan",
	// 	"Feb",
	// 	"Mar",
	// 	"Apr",
	// 	"May",
	// 	"Jun",
	// 	"July",
	// 	"Aug",
	// 	"Sep",
	// 	"Oct",
	// 	"Nov",
	// 	"Dec",
	// ];
	const day =
		date.getDate().toString().length > 1
			? date.getDate().toString()
			: `0${date.getDate()}`;

	const month = date.getMonth() + 1;

	return `${day}-${
		month.toString().length > 1 ? month : "0" + month
	}-${date.getFullYear()}`;
};
