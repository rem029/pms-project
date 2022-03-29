import { Response } from "express";
import { groupBy } from "lodash";
import { knexMySQL } from "services/database";
import { logger } from "utilities/logger";
import { handleServerResponse, handleServerError } from "helpers/serverResponse";
import { ReportProgressDetailInterface, RequestAuthInterface } from "types";
// import { DUMMY_PROGRESSIVE_DETAIL } from "../dummy/progressiveDetail";

const formatTeportProgressDetailController = (response: any): any => {
	let returnArray: any = [];

	for (const items in response) {
		//initial object
		let newData: any = {};
		let activity: any = {};
		for (let index = 0; index < response[items].length; index++) {
			activity = {
				id: response[items][index].id,
				code: response[items][index].cd,
				name: response[items][index].nm,
				progress: response[items][index].prg,
				comment: response[items][index].com,
			};
			if (index === 0) {
				newData = {
					DocNo: response[items][index].DocNo,
					DocDt: response[items][index].DocDt,
					DocEdt: response[items][index].DocEdt,
					Prj: response[items][index].Prj,
					Phs: response[items][index].Phs,
					PhsName: response[items][index].PhsName,
					Cls: response[items][index].Cls,
					ClsName: response[items][index].ClsName,
					Bld: response[items][index].Bld,
					Own: response[items][index].Own,
					Mst: response[items][index].Mst,
					Mdl: response[items][index].Mdl,
					Zon: response[items][index].Zon,
					Sec: response[items][index].Sec,
					Typ: response[items][index].Typ,
					Cns: response[items][index].Cns,
					Unt: response[items][index].Unt,
					Cancel: response[items][index].Cancel,
					activities: [activity],
				};
			}

			//update object activities
			if (index > 0) {
				// console.log(newData);
				newData = { ...newData, activities: [...newData.activities, activity] };
			}
		}
		returnArray = [...returnArray, newData];
	}

	return returnArray;
};

export const reportProgressDetailController = async (
	req: RequestAuthInterface,
	res: Response
): Promise<void> => {
	try {
		// const { userId, password } = req.user ? req.user : { userId: "", password: "" };

		logger.info("@reportProgressDetailController");

		const results = await knexMySQL.raw(
			`CALL UDSP_ProgDetailRpt(
				'2022-03-03',
				'06C',
				'TP',
				'B01020',
				'',
				'',
				'',
				'',
				'',
				'',
				'0',
				'Bld,
				DocEdt'
				)
		`
		);

		const response = results[0][0] as ReportProgressDetailInterface[];

		const formattedResponse = formatTeportProgressDetailController(
			groupBy(
				response,
				(item) => `${item.DocNo} ${new Date(item.DocDt).toLocaleDateString()}`
			)
		);

		// const formattedResponse = formatTeportProgressDetailController(
		// 	DUMMY_PROGRESSIVE_DETAIL
		// );

		handleServerResponse(res, 200, {
			success: true,
			message: "Generate Report Progress Detail Success",
			data: formattedResponse,
		});
	} catch (error) {
		logger.error(`@reportProgressDetailController Error ${error}`);
		handleServerError(res, 500, {
			success: false,
			message: "Generate Report Progress Detail Error",
			error: error as Error,
		});
	}
};
