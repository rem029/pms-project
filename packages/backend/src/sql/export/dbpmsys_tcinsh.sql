CREATE DATABASE  IF NOT EXISTS `dbpmsys` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dbpmsys`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 10.9.46.137    Database: dbpmsys
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tcinsh`
--

DROP TABLE IF EXISTS `tcinsh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tcinsh` (
  `InsH_No` int NOT NULL,
  `InsH_Dt` date NOT NULL,
  `InsH_Edt` date NOT NULL,
  `Prj_Cd` varchar(15) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `Phs_Cd` varchar(15) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `Cls_Cd` varchar(15) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `InsH_Bld` varchar(15) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `InsH_Own` varchar(15) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `InsH_Remarks` varchar(100) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL DEFAULT '',
  `InsH_Status` varchar(1) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL DEFAULT 'A',
  `InsH_Cancelled` tinyint NOT NULL DEFAULT '0',
  `InsH_CanReason` varchar(100) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`InsH_No`,`InsH_Dt`,`InsH_Edt`,`Prj_Cd`),
  KEY `filterIndex` (`Phs_Cd`,`Cls_Cd`,`InsH_Bld`,`InsH_Own`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-09 13:32:31
