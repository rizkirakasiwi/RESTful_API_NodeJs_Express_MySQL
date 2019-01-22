-- MySQL dump 10.13  Distrib 5.7.24, for Linux (x86_64)
--
-- Host: localhost    Database: pembayaran
-- ------------------------------------------------------
-- Server version	5.7.24-0ubuntu0.18.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `akun`
--

DROP TABLE IF EXISTS `akun`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `akun` (
  `kodeAkun` int(11) NOT NULL,
  `saldo` int(50) NOT NULL,
  `namaAkun` varchar(25) NOT NULL,
  `kodeRekening` int(11) NOT NULL,
  PRIMARY KEY (`kodeAkun`),
  UNIQUE KEY `kodeRekening` (`kodeRekening`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `akun`
--

LOCK TABLES `akun` WRITE;
/*!40000 ALTER TABLE `akun` DISABLE KEYS */;
INSERT INTO `akun` VALUES (991,5000000,'Rizki Rakasiwi',111),(992,3000000,'Samsul Arifin',112);
/*!40000 ALTER TABLE `akun` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mahasiswa`
--

DROP TABLE IF EXISTS `mahasiswa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mahasiswa` (
  `nim` int(12) NOT NULL,
  `nama` varchar(25) NOT NULL,
  `jurusan` varchar(50) NOT NULL,
  PRIMARY KEY (`nim`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mahasiswa`
--

LOCK TABLES `mahasiswa` WRITE;
/*!40000 ALTER TABLE `mahasiswa` DISABLE KEYS */;
INSERT INTO `mahasiswa` VALUES (17184065,'Rizki Rakasiwi','Teknik Informatika'),(17184066,'Samsul Arifin','Teknik Informatika');
/*!40000 ALTER TABLE `mahasiswa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaksi`
--

DROP TABLE IF EXISTS `transaksi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaksi` (
  `kodeAkun` int(11) NOT NULL,
  `tanggalTransaksi` varchar(10) NOT NULL,
  `jumlahBayar` float NOT NULL,
  `waktuTransaksi` time NOT NULL,
  `statusTransaksi` enum('lunas','belum lunas') NOT NULL,
  `nim` int(11) NOT NULL,
  `jenisPembayaran` varchar(50) NOT NULL,
  `kodeTransaksi` int(11) NOT NULL,
  PRIMARY KEY (`kodeTransaksi`),
  KEY `nim` (`nim`),
  KEY `kodeAkun` (`kodeAkun`),
  CONSTRAINT `transaksi_ibfk_3` FOREIGN KEY (`kodeAkun`) REFERENCES `akun` (`kodeAkun`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaksi`
--

LOCK TABLES `transaksi` WRITE;
/*!40000 ALTER TABLE `transaksi` DISABLE KEYS */;
INSERT INTO `transaksi` VALUES (991,'2019-01-21',3000000,'08:00:00','belum lunas',17184065,'Semester',111),(991,'2019-01-21',3000000,'08:00:00','belum lunas',17184066,'Semester',112);
/*!40000 ALTER TABLE `transaksi` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-22 10:56:20
