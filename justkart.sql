-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 08, 2016 at 01:22 AM
-- Server version: 5.6.12-log
-- PHP Version: 5.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `justkart`
--
CREATE DATABASE IF NOT EXISTS `justkart` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `justkart`;

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE IF NOT EXISTS `brands` (
  `brand_id` int(100) NOT NULL AUTO_INCREMENT COMMENT 'Brand ID',
  `brand_title` text NOT NULL COMMENT 'Title of the brand',
  PRIMARY KEY (`brand_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`brand_id`, `brand_title`) VALUES
(1, 'Motorola'),
(2, 'Samsung'),
(3, 'LG'),
(4, 'Huawei'),
(5, 'Dell'),
(6, 'HP'),
(7, 'Sony'),
(8, 'Onida'),
(9, 'Aqua'),
(10, 'Comfylite'),
(11, 'Hero'),
(12, 'Kamachi');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE IF NOT EXISTS `cart` (
  `pro_id` int(11) NOT NULL COMMENT 'ID of the Product in the cart',
  `User_ID` int(255) NOT NULL COMMENT 'ID of the User who put this product in the cart',
  `qty` int(11) NOT NULL COMMENT 'Quantity of the items in the specify item',
  KEY `fk_cart_UID` (`User_ID`),
  KEY `pro_id` (`pro_id`),
  KEY `pro_id_2` (`pro_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`pro_id`, `User_ID`, `qty`) VALUES
(1, 1, 2),
(2, 1, 0),
(3, 2, 0),
(5, 1, 0),
(6, 1, 0),
(7, 1, 1),
(8, 2, 1),
(3, 1, 0),
(1, 2, 1),
(9, 2, 1),
(4, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `cat_id` int(100) NOT NULL AUTO_INCREMENT COMMENT 'ID of the Category',
  `cat_title` text NOT NULL COMMENT 'Category title',
  PRIMARY KEY (`cat_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`cat_id`, `cat_title`) VALUES
(1, 'Electronics'),
(2, 'Computers & Office'),
(3, 'Mobiles & Tablets'),
(4, 'Home & Kitchen'),
(5, 'Men''s Fashion'),
(6, 'Women''s Fashion'),
(7, 'Babies & Kids Care'),
(8, 'Books & Media'),
(9, 'Automobiles & accessories'),
(10, 'Sports & Outdoors');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int(100) NOT NULL AUTO_INCREMENT COMMENT 'ID of the Product',
  `product_cat` int(100) NOT NULL COMMENT 'ID linking to ID of the category table',
  `product_brand` int(100) NOT NULL COMMENT 'ID linking to ID of the brand table',
  `product_title` varchar(255) NOT NULL COMMENT 'Product Title',
  `product_price` int(255) NOT NULL COMMENT 'Product price',
  `product_descrp` text NOT NULL COMMENT 'Product Description',
  `product_image` text NOT NULL COMMENT 'Product Image',
  `product_keywords` text NOT NULL COMMENT 'Product Keywords',
  PRIMARY KEY (`product_id`),
  KEY `fkprocat` (`product_cat`),
  KEY `fkprobrand` (`product_brand`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_cat`, `product_brand`, `product_title`, `product_price`, `product_descrp`, `product_image`, `product_keywords`) VALUES
(1, 3, 2, 'Samsung Galaxy S6 Edge Plus', 53900, '<ul>\n<li><span style="color: #111111; font-family: Arial, sans-serif; font-size: 13px; line-height: 19px;">16MP primary camera with LED flash, auto focus and 5MP front facing camera.</span></li>\n<li><span style="color: #111111; font-family: Arial, sans-serif; font-size: 13px; line-height: 19px;">5.7-inch (14.47 centimeters) quad HD capacitive touchscreen with 2560 x 1440 pixels resolution and 518 ppi pixel density.</span></li>\n<li><span style="color: #111111; font-family: Arial, sans-serif; font-size: 13px; line-height: 19px;">Android v5.1 Lollipop operating system with 2.1GHz quad core + 1.5GHz quad core processor, 4GB RAM, 32GB internal memory and single SIM.</span></li>\n<li><span style="color: #111111; font-family: Arial, sans-serif; font-size: 13px; line-height: 19px;">3000mAH lithium-ion battery.</span></li>\n<li><span style="color: #111111; font-family: Arial, sans-serif; font-size: 13px; line-height: 19px;">1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase.</span></li>\n</ul>', 'S6_Plus.jpg', 'samung,android,S6 Edge Plus'),
(2, 3, 4, 'Huawei Nexus 6P', 39990, 'Huawei Google Nexus 6P smartphone was launched in October 2015. The phone comes with a 5.70-inch touchscreen display with a resolution of 1440 pixels by 2560 pixels at a PPI of 518 pixels per inch. The Huawei Google Nexus 6P is powered by 2GHz octa-core Qualcomm Snapdragon 810 processor and it comes with 3GB of RAM. The phone packs 32GB of internal storage cannot be expanded. As far as the cameras are concerned, the Huawei Google Nexus 6P packs a 12.3-megapixel primary camera on the rear and a 8-megapixel front shooter for selfies. The Huawei Google Nexus 6P runs Android 6.0 and is powered by a 3450mAh non removable battery. It measures 159.30 x 77.80 x 7.30 (height x width x thickness) and weighs 178.00 grams. The Huawei Google Nexus 6P is a single SIM (GSM) smartphone that accepts a Nano-SIM. Connectivity options include Wi-Fi, GPS, Bluetooth, NFC, 4G (with support for Band 40 used by some LTE networks in India). Sensors on the phone include Proximity sensor, Ambient light sensor, Accelerometer, and Gyroscope.', 'nexus_6p.jpg', 'Nexus 6P,Huawei,Stock Android,Google'),
(3, 2, 5, 'DELL XPS 13 ', 127000, 'Intel Core i7 (5th Gen)8 GB DDR3 RAM256 GB SSD', 'dell_xps.jpg', 'Dell laptops, XPS 13, 4k'),
(4, 2, 6, 'HP Spectre 13-4013TU x360', 124999, 'Intel Core i7 (5th Gen)8 GB DDR3 RAM256 GB SSD Windows 8.1', 'hp_ultrabook.jpg', 'HP laptops, Spectre 13 x360, 1440p'),
(5, 1, 7, 'Sony KLV-40R562C 101.6 cm (40) Full HD Internet LED Television', 48299, ' Type : LED - Display Resolution : 1920 x 1080 - Connectivity : 2 X HDMI & 2 X USB - Warranty : 1 Year Sony India Warranty - Screen Size : 101.6 cm (40) ', 'Sony_KLV_40R562C.jpg', 'Sony TV , 1080p'),
(6, 1, 8, 'Onida 1.0 Ton 3 Star W123TRD Trendy Plus Window Air Conditioner', 22631, ' - 100 % Original Product with Brand Warranty | 1+5 Years Warranty - NO-HASSLES INSTALLATION SUPPORT ! We give you an Installation Helpline upon Delivery for a seamless, quick installation. - Auto Air Swing - Turbo Cleane-Saver - Sleep Mode ', 'Onida_1_Ton.jpg', 'Onida AC , 1 TON'),
(7, 4, 9, 'Aqua 18 Ltr Aqua Supreme Ro+uv+uf+tds Water Purifiers', 3850, ' - Stage Purification Process : 5 - Electricity Required : Yes - Capacity : 5-15 Ltr - Auto Shut Off : Yes - Type : RO ', 'Aqua_18Ltr.jpg', 'Aqua purifier, 18 Ltr'),
(8, 4, 10, 'Comfylite Pillows (Set of 2)', 499, ' - Set Contents : Pillows - Colour : White - Pillow Cover Length in inches : 24 inches - Pillow Cover Width in inches : 16 inches - Cover Material : Micro Polyester ', 'Comfylite-Pillows.jpg', 'Comfylite Pillows ,(Set of 2)'),
(9, 10, 11, 'Hero Green & Black Next 26T 18 Speed Sprint Bicycle', 6530, ' Brand : Hero Product Type : Bicycle Features : Light in weight Moves swiftly over dirt and debris Others : Comfortable seat Easy on legs and ankles SUPC: SDL240540072 ', 'Hero-Green.jpg', 'Hero cycles, green & black'),
(10, 10, 12, 'Kamachi 6 in 1 Manual Treadmill', 15995, ' - Training for the game of life - This is a heavy product and might take longer than usual to get delivered - Compact & foldable - Product Type: Manual Treadmill - Easy to store ', 'Kamachi-6-in-1.jpg', 'Kamachi , Manual Treadmill');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `User_ID` int(255) NOT NULL AUTO_INCREMENT COMMENT 'ID of the User',
  `UName` varchar(255) NOT NULL COMMENT 'User Name',
  `Email_address` varchar(255) NOT NULL COMMENT 'Email Address of the User',
  `Password` varchar(255) NOT NULL COMMENT 'Password of the User(Encrypted)',
  `Mobile_no` int(11) NOT NULL COMMENT 'Mobile number of the user',
  `Address` varchar(255) NOT NULL COMMENT 'Home Address of the user',
  `Pin_code` int(11) NOT NULL COMMENT 'Pin Code of the User''s home Address',
  `Purchases` varchar(255) NOT NULL COMMENT 'Purchases made by the user',
  `Name` varchar(255) NOT NULL COMMENT 'Name of the User',
  PRIMARY KEY (`User_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`User_ID`, `UName`, `Email_address`, `Password`, `Mobile_no`, `Address`, `Pin_code`, `Purchases`, `Name`) VALUES
(1, 'root', '', '123456', 0, '', 0, '', 'Admin'),
(2, 'Ave', 'root@gmail.com', '123456', 0, '', 123456, '', 'Ave');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `fk_cart_PID` FOREIGN KEY (`pro_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `fk_cart_UID` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fkprobrand` FOREIGN KEY (`product_brand`) REFERENCES `brands` (`brand_id`),
  ADD CONSTRAINT `fkprocat` FOREIGN KEY (`product_cat`) REFERENCES `categories` (`cat_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
