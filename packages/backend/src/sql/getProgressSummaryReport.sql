-- Construction
SELECT
    COALESCE(MAX(CASE WHEN InsD_Code = 'FND' THEN InsD_Prg END),0) as activityFoundation,
    COALESCE(MAX(CASE WHEN InsD_Code = 'SUP' THEN InsD_Prg END),0) as activitySuperStructure,
    COALESCE(MAX(CASE WHEN InsD_Code = 'PRT' THEN InsD_Prg END),0) as activityPartitionBlockWorkPlaster,
    COALESCE(MAX(CASE WHEN InsD_Code = 'ELE1' THEN InsD_Prg END),0) as activityElectricalFirstFix,
    COALESCE(MAX(CASE WHEN InsD_Code = 'MCH1' THEN InsD_Prg END),0) as activityMechanicalFirstFix,
    COALESCE(MAX(CASE WHEN InsD_Code = 'WTP' THEN InsD_Prg END), 0) as activityWetAreaProofing,
    COALESCE(MAX(CASE WHEN InsD_Code = 'SRD' THEN InsD_Prg END),0) as activityScreed,
    COALESCE(MAX(CASE WHEN InsD_Code = 'TIL' THEN InsD_Prg END),0) as activityFlooringTerrazzoEpoxy,
    COALESCE(MAX(CASE WHEN InsD_Code = 'WAL' THEN InsD_Prg END),0) as activityWallCladding,
    COALESCE(MAX(CASE WHEN InsD_Code = 'ELE2' THEN InsD_Prg END),0) as activityElectricalSecondFix,
    COALESCE(MAX(CASE WHEN InsD_Code = 'MCH2' THEN InsD_Prg END) ,0) as activityMechanicalSecondFix,
    COALESCE(MAX(CASE WHEN InsD_Code = 'RWP' THEN InsD_Prg END),0) as activityRoofWaterProofing,
    COALESCE(MAX(CASE WHEN InsD_Code = 'EPN' THEN InsD_Prg END),0) as activityExternalPaint,
    COALESCE(MAX(CASE WHEN InsD_Code = 'IPN' THEN InsD_Prg END),0) as activityInternalPaint,
    COALESCE(MAX(CASE WHEN InsD_Code = 'WND' THEN InsD_Prg END),0) as activityWindows,
    COALESCE(MAX(CASE WHEN InsD_Code = 'DR' THEN InsD_Prg END),0) as activityDoors,
    COALESCE(MAX(CASE WHEN InsD_Code = 'HNDR' THEN InsD_Prg END),0) as activityHandlRails,
    COALESCE(MAX(CASE WHEN InsD_Code = 'MCHF' THEN InsD_Prg END),0) as activityMechanical,
    COALESCE(MAX(CASE WHEN InsD_Code = 'ELEF' THEN InsD_Prg END),0) as activityElectrical,
    COALESCE(MAX(CASE WHEN InsD_Code = 'KTC' THEN InsD_Prg END),0) as activityKitchen,
    COALESCE(MAX(CASE WHEN InsD_Code = 'OTH' THEN InsD_Prg END),0) as activityOthers,
    InsH_No as inspectionNumber,
    InsH_Dt as inspectionDate,   
    InsH_Bld as bldgCode,
    pmsysdb.ownm.Own_Name as ownerName,
    pmsysdb.buildm.Typ_Cd as typeCode,
    pmsysdb.consysm.Cns_Name as constructionMethodName,
    pmsysdb.buildm.Prj_Cd as projectCode,
    pmsysdb.buildm.Mst_Cd as milestoneCode,
    pmsysdb.buildm.Unit as unit,
    pmsysdb.buildm.Mode as module,
    pmsysdb.phasem.Phs_Name as phaseName,
    pmsysdb.classm.Cls_Cd as classificationName,
    InsH_Cancelled as isCancelled
FROM 
    pmsysdb.insentryh
LEFT JOIN
    pmsysdb.insentryd
ON  
    pmsysdb.insentryd.InsD_No = pmsysdb.insentryh.InsH_No
LEFT JOIN
    pmsysdb.buildm
ON  
    pmsysdb.buildm.Bld_Cd = pmsysdb.insentryh.InsH_Bld
LEFT JOIN
    pmsysdb.ownm
ON  
    pmsysdb.ownm.Own_Cd = pmsysdb.insentryh.InsH_Own
LEFT JOIN
    pmsysdb.phasem
ON  
    pmsysdb.phasem.Phs_Cd = pmsysdb.insentryh.Phs_Cd
LEFT JOIN
    pmsysdb.classm
ON  
    pmsysdb.classm.Cls_Cd = pmsysdb.insentryh.Cls_Cd
LEFT JOIN
    pmsysdb.consysm
ON  
    pmsysdb.consysm.Cns_Cd = pmsysdb.buildm.Cns_Cd
GROUP BY
	InsH_No
ORDER BY
    InsH_Dt DESC;

-- Testing and commissioning
SELECT
    COALESCE(MAX(CASE WHEN InsD_Code = 'BPITP' THEN InsD_Prg END),0) as activityBuildingPreComm,
    COALESCE(MAX(CASE WHEN InsD_Code = 'BPRWT' THEN InsD_Prg END),0) as activityBooster,
    COALESCE(MAX(CASE WHEN InsD_Code = 'CCSYS' THEN InsD_Prg END),0) as activityCctv,
    COALESCE(MAX(CASE WHEN InsD_Code = 'CLAFC' THEN InsD_Prg END),0) as activityCivilArchFinishes,
    COALESCE(MAX(CASE WHEN InsD_Code = 'DCTVO' THEN InsD_Prg END),0) as activityDataCablingTV,
    COALESCE(MAX(CASE WHEN InsD_Code = 'DFCHS' THEN InsD_Prg END),0) as activityDisinfectionChemmical,
    COALESCE(MAX(CASE WHEN InsD_Code = 'DISTB' THEN InsD_Prg END),0) as activityDistributionBoards,
    COALESCE(MAX(CASE WHEN InsD_Code = 'ELEWH' THEN InsD_Prg END),0) as activityelectricalWaterHeat,
    COALESCE(MAX(CASE WHEN InsD_Code = 'ELSYS' THEN InsD_Prg END),0) as activityEmergencyLighting,
    COALESCE(MAX(CASE WHEN InsD_Code = 'ELVNT' THEN InsD_Prg END),0) as activityElvNetwork,
    COALESCE(MAX(CASE WHEN InsD_Code = 'EXFAN' THEN InsD_Prg END),0) as activityExhaustFans,
    COALESCE(MAX(CASE WHEN InsD_Code = 'FASYS' THEN InsD_Prg END),0) as activityFireAlarmSystem,
    COALESCE(MAX(CASE WHEN InsD_Code = 'FDPLR' THEN InsD_Prg END),0) as activityFeederPillars,
    COALESCE(MAX(CASE WHEN InsD_Code = 'FIREX' THEN InsD_Prg END),0) as activityFireExtinguishersAndFireBlankets,
    COALESCE(MAX(CASE WHEN InsD_Code = 'FLMST' THEN InsD_Prg END),0) as activityFeederPillar,
    COALESCE(MAX(CASE WHEN InsD_Code = 'FNLIT' THEN InsD_Prg END),0) as activityFinalIntegreationAllSystems,
    COALESCE(MAX(CASE WHEN InsD_Code = 'FNLTC' THEN InsD_Prg END),0) as activityFinalTncLV,
    COALESCE(MAX(CASE WHEN InsD_Code = 'KVNET' THEN InsD_Prg END),0) as activityElevenKvNetwork,
    COALESCE(MAX(CASE WHEN InsD_Code = 'LTSYS' THEN InsD_Prg END),0) as activityLightingSystems,
    COALESCE(MAX(CASE WHEN InsD_Code = 'LVNET' THEN InsD_Prg END),0) as activityLvNetwork,
    COALESCE(MAX(CASE WHEN InsD_Code = 'MEINS' THEN InsD_Prg END),0) as activityMechEleInstallation,
    COALESCE(MAX(CASE WHEN InsD_Code = 'MFTCC' THEN InsD_Prg END),0) as activityManufacturerTncCertificate,
    COALESCE(MAX(CASE WHEN InsD_Code = 'PWIME' THEN InsD_Prg END),0) as activityPowerIsolatorsForMech,
    COALESCE(MAX(CASE WHEN InsD_Code = 'PWSYS' THEN InsD_Prg END),0) as activityPowerSystems,
    COALESCE(MAX(CASE WHEN InsD_Code = 'SLVAC' THEN InsD_Prg END),0) as activitySleevesForAC,
    COALESCE(MAX(CASE WHEN InsD_Code = 'SUBDB' THEN InsD_Prg END),0) as activitySubmainDB,
    COALESCE(MAX(CASE WHEN InsD_Code = 'SWARE' THEN InsD_Prg END),0) as activitySanitaryWare,
    COALESCE(MAX(CASE WHEN InsD_Code = 'TCDSG' THEN InsD_Prg END),0) as activityTncDeSnagggingComplete,
    COALESCE(MAX(CASE WHEN InsD_Code = 'WMEOP' THEN InsD_Prg END),0) as activityWaterMeter,
    InsH_No as inspectionNumber,
    InsH_Dt as inspectionDate,   
    InsH_Bld as bldgCode,
    pmsysdb.ownm.Own_Name as ownerName,
    pmsysdb.buildm.Typ_Cd as typeCode,
    pmsysdb.consysm.Cns_Name as constructionMethodName,
    pmsysdb.buildm.Prj_Cd as projectCode,
    pmsysdb.buildm.Mst_Cd as milestoneCode,
    pmsysdb.buildm.Unit as unit,
    pmsysdb.buildm.Mode as module,
    pmsysdb.phasem.Phs_Name as phaseName,
    pmsysdb.classm.Cls_Cd as classificationName,
    InsH_Cancelled as isCancelled
FROM 
    pmsysdb.insentryh
LEFT JOIN
    pmsysdb.insentryd
ON  
    pmsysdb.insentryd.InsD_No = pmsysdb.insentryh.InsH_No
LEFT JOIN
    pmsysdb.buildm
ON  
    pmsysdb.buildm.Bld_Cd = pmsysdb.insentryh.InsH_Bld
LEFT JOIN
    pmsysdb.ownm
ON  
    pmsysdb.ownm.Own_Cd = pmsysdb.insentryh.InsH_Own
LEFT JOIN
    pmsysdb.phasem
ON  
    pmsysdb.phasem.Phs_Cd = pmsysdb.insentryh.Phs_Cd
LEFT JOIN
    pmsysdb.classm
ON  
    pmsysdb.classm.Cls_Cd = pmsysdb.insentryh.Cls_Cd
LEFT JOIN
    pmsysdb.consysm
ON  
    pmsysdb.consysm.Cns_Cd = pmsysdb.buildm.Cns_Cd
WHERE 
    activityBuildingPreComm = 100
GROUP BY
	InsH_No
ORDER BY
    InsH_Dt DESC;