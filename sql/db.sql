-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: automatic-list
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` char(30) NOT NULL,
  `expDays` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'Fruits & Veggie',7),(2,'Diary',100),(3,'Meat',3),(4,'Snacks',5);
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `my_list`
--

DROP TABLE IF EXISTS `my_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `my_list` (
  `userName` char(20) NOT NULL,
  `productId` int NOT NULL,
  PRIMARY KEY (`userName`,`productId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my_list`
--

LOCK TABLES `my_list` WRITE;
/*!40000 ALTER TABLE `my_list` DISABLE KEYS */;
INSERT INTO `my_list` VALUES ('didim',1),('didim',2),('zohars',1),('zohars',4),('zohars',5),('zohars',6),('zohars',11);
/*!40000 ALTER TABLE `my_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` char(30) NOT NULL,
  `departmentId` int NOT NULL,
  `price` decimal(8,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `product_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Cucumber',1,2.90),(2,'Orange',1,4.70),(3,'Cauliflower',1,5.30),(4,'Beef',3,10.50),(5,'Cheddar Cheese',2,8.50),(6,'Labane',2,6.00),(7,'Chocolate',4,5.50),(8,'Yogurt',2,4.50),(9,'Dairy Milk',2,8.70),(10,'Banana',1,2.00),(11,'Apple',1,4.00),(12,'Strawberry',1,9.00),(13,'Cottage Cheese',2,12.50),(14,'Chicken',3,17.90),(15,'Stakes',3,8.00),(16,'Energy Bar',4,7.90),(17,'Potato Chips',4,3.50);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase` (
  `userName` char(20) NOT NULL,
  `purchaseId` char(28) NOT NULL,
  `date` char(10) NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  KEY `purchase_primary` (`userName`,`purchaseId` DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase`
--

LOCK TABLES `purchase` WRITE;
/*!40000 ALTER TABLE `purchase` DISABLE KEYS */;
INSERT INTO `purchase` VALUES ('zohars','2021-05-16 08:00:05.710-1988','2021-05-16',1,5),('zohars','2021-05-16 08:00:05.710-1988','2021-05-16',2,12),('zohars','2021-05-16 12:26:07.539-9535','2021-05-16',1,15),('zohars','2021-05-16 12:26:07.539-9535','2021-05-16',2,112),('zohars','2021-05-16 12:31:34.964-6953','2021-04-17',4,5),('zohars','2021-05-17 11:06:54.327-9957','2021-05-03',4,1),('zohars','2021-05-17 11:06:54.327-9957','2021-05-16',5,2),('zohars','2021-05-17 11:06:54.327-9957','2021-05-17',6,3),('zohars','2021-05-17 13:43:40.660-8126','2021-05-17',1,12),('zohars','2021-05-17 20:53:42.545-0687','2021-05-17',4,2),('zohars','2021-05-17 20:53:42.545-0687','2021-05-17',5,5),('zohars','2021-05-18 21:03:14.719-7339','2021-05-18',4,2);
/*!40000 ALTER TABLE `purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userName` char(20) NOT NULL,
  `firstName` char(20) NOT NULL,
  `lastName` char(20) NOT NULL,
  `email` char(20) NOT NULL,
  `password` char(20) NOT NULL,
  `role` char(20) NOT NULL DEFAULT 'User',
  PRIMARY KEY (`userName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('davidb','David','Bowie','db@mail.com','123456','User'),('didim','Didi','Manusi','dm@mail.com','123456','User'),('elenm','Elen','Guntman','eg@mail.com','123456','Admin'),('mariahc','Mariah','Carey','mc@mail','123456','User'),('zohars','Zohar','Sabari','zs@mail.com','123456','Admin');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-19  0:07:40
