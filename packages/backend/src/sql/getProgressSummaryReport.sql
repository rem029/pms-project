-- INSPECTION NO.
-- INSPECTION DATE
-- BLDG CODE buildm
-- OWNER NAME  ownm
-- TYPE CODE buildm
-- CONSTRUCTION METHOD CODE buildm
-- MILESTONE CODE buildm
-- UNITS buildm
-- MODULES buildm
-- PHASE NAME phasem
-- CLASSIFICATION NAME classm
-- pmsysdb.insentryh.Prj_Cd as projectCode, projm
-- pmsysdb.insentryh.Phs_Cd as phaseCode phasem,
-- pmsysdb.insentryh.Cls_Cd as classificationCode classm,

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
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'name',InsD_Name,
            'progress',InsD_Prg            
        )
    ) as activities    
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