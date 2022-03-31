-- SELECT * FROM `pmsysdb`.`insentryh`; --inspections
SELECT * FROM `pmsysdb`.`buildm`; --build info
-- SELECT * FROM `pmsysdb`.`insentryd`; --activities


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
    InsH_No as number,
    InsH_Dt as date,
    InsH_Bld as bldgCode,
    InsH_Own,
    pmsysdb.insentryh.Prj_Cd as projectCode,
    pmsysdb.insentryh.Phs_Cd as phaseCode,
    pmsysdb.insentryh.Cls_Cd as classificationCode,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'Id',InsD_Id,
            'Code',InsD_Code,
            'Name',InsD_Name,
            'Progress',InsD_Prg,
            'Comments',InsD_Com
    )) as activities,
    InsH_Cancelled as isCancelled
FROM 
    pmsysdb.insentryh
LEFT JOIN
    pmsysdb.insentryd
ON  
    `pmsysdb`.`insentryd`.InsD_No = `pmsysdb`.`insentryh`.InsH_No
GROUP BY
    InsH_No;



