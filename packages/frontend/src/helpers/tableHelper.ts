export type TableOrderBy = "asc" | "desc";

export const sortTableHelper = <
	T extends Omit<Record<K, unknown>, "__typename">,
	K extends keyof T
>(
	tableA: T,
	tableB: T,
	sort: { key: keyof T; order: TableOrderBy }
): number => {
	const { key, order } = sort;
	const keyCasted = key as K;

	if (key === "inspectionDate") {
		//compare dates

		if (order === "asc")
			return (
				new Date(tableA[keyCasted] as string).getTime() -
				new Date(tableB[keyCasted] as string).getTime()
			);
		if (order === "desc")
			return (
				new Date(tableA[keyCasted] as string).getTime() -
				new Date(tableB[keyCasted] as string).getTime()
			);
	}
	if (typeof tableA[keyCasted] === "number") {
		if (order === "asc") return Number(tableA[keyCasted]) - Number(tableB[keyCasted]);
		if (order === "desc") return Number(tableB[keyCasted]) - Number(tableA[keyCasted]);
	}
	if (typeof tableA[keyCasted] !== "number") {
		if (
			order === "asc" &&
			(tableA[keyCasted] as string).toString().toLowerCase() >
				(tableB[keyCasted] as string).toString().toLowerCase()
		)
			return 1;
		if (
			order === "desc" &&
			(tableA[keyCasted] as string).toString().toLowerCase() <
				(tableB[keyCasted] as string).toString().toLowerCase()
		)
			return -1;
	}

	return 0;
};
