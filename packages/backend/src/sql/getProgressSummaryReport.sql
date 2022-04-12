SELECT 
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
    InsH_Cancelled as isCancelled,
    MAX(CASE WHEN InsD_Code = 'FND' THEN InsD_Prg END) as activityFoundation,
    MAX(CASE WHEN InsD_Code = 'SUP' THEN InsD_Prg END) as activitySuperStructure,
    MAX(CASE WHEN InsD_Code = 'PRT' THEN InsD_Prg END) as activityPartitionBlockWorkPlaster,
    MAX(CASE WHEN InsD_Code = 'ELE1' THEN InsD_Prg END) as activityElectricalFirstFix,
    MAX(CASE WHEN InsD_Code = 'MCH1' THEN InsD_Prg END) as activityMechanicalFirstFix,
    MAX(CASE WHEN InsD_Code = 'WTP' THEN InsD_Prg END) as activityWetAreaProofing,
    MAX(CASE WHEN InsD_Code = 'SRD' THEN InsD_Prg END) as activityScreed,
    MAX(CASE WHEN InsD_Code = 'TIL' THEN InsD_Prg END) as activityFlooringTerrazzoEpoxy,
    MAX(CASE WHEN InsD_Code = 'WAL' THEN InsD_Prg END) as activityWallCladding,
    MAX(CASE WHEN InsD_Code = 'ELE2' THEN InsD_Prg END) as activityElectricalSecondFix,
    MAX(CASE WHEN InsD_Code = 'MCH2' THEN InsD_Prg END) as activityMechanicalSecondFix,
    MAX(CASE WHEN InsD_Code = 'RWP' THEN InsD_Prg END) as activityRoofWaterProofing,
    MAX(CASE WHEN InsD_Code = 'EPN' THEN InsD_Prg END) as activityExternalPaint,
    MAX(CASE WHEN InsD_Code = 'IPN' THEN InsD_Prg END) as activityInternalPaint,
    MAX(CASE WHEN InsD_Code = 'WND' THEN InsD_Prg END) as activityWindows,
    MAX(CASE WHEN InsD_Code = 'DR' THEN InsD_Prg END) as activityDoors,
    MAX(CASE WHEN InsD_Code = 'HNDR' THEN InsD_Prg END) as activityHandlRails,
    MAX(CASE WHEN InsD_Code = 'MCHF' THEN InsD_Prg END) as activityMechanical,
    MAX(CASE WHEN InsD_Code = 'ELEF' THEN InsD_Prg END) as activityElectrical,
    MAX(CASE WHEN InsD_Code = 'KTC' THEN InsD_Prg END) as activityKitchen,
    MAX(CASE WHEN InsD_Code = 'OTH' THEN InsD_Prg END) as activityOthers
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