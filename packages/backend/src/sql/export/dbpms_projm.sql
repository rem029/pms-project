CREATE DATABASE  IF NOT EXISTS `dbpms` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dbpms`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 10.9.46.137    Database: dbpms
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
-- Table structure for table `projm`
--

DROP TABLE IF EXISTS `projm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projm` (
  `Prj_Cd` varchar(15) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `Prj_Name` varchar(75) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `Prj_Desc` varchar(150) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `Prj_Add1` varchar(75) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `Prj_Add2` varchar(75) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `Prj_Ph` varchar(30) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `Prj_Fax` varchar(30) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `IsActive` tinyint(1) NOT NULL DEFAULT '0',
  `Prj_Client` varchar(150) COLLATE latin1_general_ci NOT NULL,
  `Prj_PMC` varchar(75) COLLATE latin1_general_ci NOT NULL,
  `Prj_Contract` varchar(75) COLLATE latin1_general_ci NOT NULL,
  `Prj_StartDt` date NOT NULL,
  `Prj_EndDt` date NOT NULL,
  `Prj_DurDays` int NOT NULL DEFAULT '0',
  `Prj_Value` decimal(15,2) NOT NULL DEFAULT '0.00',
  `Prj_Approve` varchar(75) COLLATE latin1_general_ci NOT NULL,
  `Prj_RevEndDt` date NOT NULL,
  PRIMARY KEY (`Prj_Cd`)
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

-- Dump completed on 2022-05-09 13:32:17
