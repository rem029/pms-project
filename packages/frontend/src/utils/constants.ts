export const URL_BASE = "http://10.9.46.132:6060";
export const URL_OPEN_WEATHER = "https://api.openweathermap.org/data/2.5/weather";

export const URL_LOGIN = URL_BASE + "/login";
export const URL_USER = URL_BASE + "/user";

export const URL_REPORTING_MASTER_DELIVERABLE = URL_BASE + "/master/deliverables";
export const URL_REPORTING_MASTER_ACTIVITY = URL_BASE + "/master/activity";

export const URL_REPORTING_PROGRESS_DETAILED = URL_BASE + "/report/progress-detail";
export const URL_REPORTING_PROGRESS_SUMMARY = URL_BASE + "/report/progress-summary";

export const URL_REPORTING_FILTER = URL_BASE + "/report/filter";
export const URL_REPORTING_FILTER_CONSTRUCTION = URL_BASE + "/report/filter/construction";
export const URL_REPORTING_FILTER_PHASE = URL_BASE + "/report/filter/phase";
export const URL_REPORTING_FILTER_CLASSIFICATION =
	URL_BASE + "/report/filter/classification";
export const URL_REPORTING_FILTER_PROJECT = URL_BASE + "/report/filter/project";
export const URL_REPORTING_FILTER_MILESTONE = URL_BASE + "/report/filter/milestone";
export const URL_REPORTING_FILTER_ZONE = URL_BASE + "/report/filter/zone";
export const URL_REPORTING_FILTER_SECTION = URL_BASE + "/report/filter/section";
export const URL_REPORTING_FILTER_TYPE = URL_BASE + "/report/filter/type";
export const URL_REPORTING_FILTER_OWNER = URL_BASE + "/report/filter/owner";
export const URL_REPORTING_FILTER_BUILDING = URL_BASE + "/report/filter/building";

export const NOTISTACK_AUTO_HIDE_MS = 1500;

export const TABLE_HEADER_REPORTING_DETAIL_PROGRESS = {
	inspectionNumber: "Inspection No.",
	inspectionDate: "Inspection Date",
	bldgCode: "Building",
	ownerName: "Owner",
	typeCode: "Type",
	constructionMethodName: "Method",
	milestoneCode: "Milestone",
	unit: "Units",
	module: "Modules",
	phaseName: "Phase",
	classificationName: "Classification",
	isCancelled: "Is cancelled?",
	activities: {
		id: "ID",
		code: "Code",
		name: "Name",
		progress: "Progress",
		comments: "Comments",
	},
};

export const TABLE_HEADER_REPORTING_SUMMARY_PROGRESS = {
	inspectionNumber: "Inspection No.",
	inspectionDate: "Inspection Date",
	bldgCode: "Building",
	ownerName: "Owner",
	typeCode: "Type",
	constructionMethodName: "Method",
	milestoneCode: "Milestone",
	unit: "Units",
	module: "Modules",
	isCancelled: "Is cancelled?",
};

export const TABLE_HEADER_REPORTING_SUMMARY_PROGRESS_ACTIVITY_CONSTRUCTION = {
	activityFoundation: "FOUNDATION",
	activitySuperStructure: "SUPER STRUCTURE",
	activityPartitionBlockWorkPlaster: "PARTITIONS/ BLOCKWORK/ PLASTER",
	activityElectricalFirstFix: "ELECTRICAL 1ST FIX",
	activityMechanicalFirstFix: "MECHANICAL 1ST FIX",
	activityWetAreaProofing: "WET AREA PROOFING",
	activityScreed: "SCREED",
	activityFlooringTerrazzoEpoxy: "FLOORING (TERRAZZO/ EPOXY)",
	activityWallCladding: "WALL CLADDING",
	activityElectricalSecondFix: "ELECTRICAL 2ND FIX",
	activityMechanicalSecondFix: "MECHANICAL 2ND FIX",
	activityRoofWaterProofing: "ROOF WATER PROOFING",
	activityExternalPaint: "EXTERNAL PAINT",
	activityInternalPaint: "INTERNAL PAINT",
	activityWindows: "WINDOWS",
	activityDoors: "DOORS",
	activityHandlRails: "HAND RAILS",
	activityMechanical: "MECHANICAL",
	activityElectrical: "ELECTRICAL",
	activityKitchen: "KITCHEN",
	activityOthers: "OTHERS",
};

export const TABLE_HEADER_REPORTING_SUMMARY_PROGRESS_ACTIVITY_TNC = {
	activityBuildingPreComm: "BUILDING PRE-COMMISSIONING REPORT AS PER ITP",
	activityBooster: "BOOSTER PUMPS & ROOF WATER TANKS",
	activityCctv: "CCTV SYSTEM (Standalone)",
	activityCivilArchFinishes: "CIVIL/ ARCHITECTURAL FINISHES COMPLETED",
	activityDataCablingTV: "DATA CABLING/TV OUTLET",
	activityDisinfectionChemmical: "DISINFECTION/CHECMICAL STERLIZATION",
	activityDistributionBoards: "DISTRIBUTION BOARDS",
	activityelectricalWaterHeat: "ELECTRICAL WATER HEATERS",
	activityEmergencyLighting: "EMERGENCY LIGHTING SYSTEMS",
	activityElvNetwork: "ELV NETWORK",
	activityExhaustFans: "EXHAUST FANS(BATHROOM & PANTRY)",
	activityFireAlarmSystem: "FIRE ALARM SYSTEM (STANDALONE)",
	activityFeederPillars: "FEEDER PILLARS",
	activityFireExtinguishersAndFireBlankets: "FIRE EXTINGUISIHERS & FIRE BLANKETS",
	activityFeederPillarLvMwPanels:
		"FEEDER PILLARS, LV, MW PANELS & ELECTRICAL SYSTEMS FOR SUBSTATIONS",
	activityFinalIntegreationAllSystems:
		"FINAL INTEGRATION FOR ALL SYSTEMS(FIRE ALARM, CCTV, BMS ETC)",
	activityFinalTncLV: "FINAL T&C LV,MV AND ELECTRICAL SYSTEMS",
	activityElevenKvNetwork: "11KV NETWORK",
	activityLightingSystems: "LIGHTING SYSTEMS",
	activityLvNetwork: "LV NETWORK",
	activityMechEleInstallation: "MECHANICAL/ ELECTRICAL INSTALLATION COMPLETED",
	activityManufacturerTncCertificate: "MANUFACTURER T&C CERTIFICATE AVAILABLE",
	activityPowerIsolatorsForMech: "POWER ISOLATORS FOR MECHANICAL EQUIPMENTS",
	activityPowerSystems: "POWER SYSTEMS",
	activitySleevesForAC: "SLEEVES FOR A/C",
	activitySubmainDB: "SUBMAIN DB",
	activitySanitaryWare: "SANITARY WARE",
	activityTncDeSnagggingComplete: "T&C AND DE-SNAGGING COMPLETE",
	activityWaterMeter: "WATER METER ENERGIZED & OPERATING",
};
