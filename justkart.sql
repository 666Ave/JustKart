-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 18, 2016 at 02:03 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `justkart`
--

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE IF NOT EXISTS `brands` (
  `brand_id` int(100) NOT NULL AUTO_INCREMENT COMMENT 'Brand ID',
  `brand_title` text NOT NULL COMMENT 'Title of the brand',
  PRIMARY KEY (`brand_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

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
(12, 'Kamachi'),
(13, 'Lenovo'),
(14, 'Mi');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE IF NOT EXISTS `cart` (
  `Cart_ID` int(255) NOT NULL AUTO_INCREMENT COMMENT 'ID of the Cart items',
  `pro_id` int(11) NOT NULL COMMENT 'ID of the Product in the cart',
  `User_ID` int(255) NOT NULL COMMENT 'ID of the User who put this product in the cart',
  `qty` int(11) NOT NULL COMMENT 'Quantity of the items in the specify item',
  `timestamp` timestamp NOT NULL COMMENT 'Time stamp of when the item was added',
  `expired` tinyint(1) NOT NULL COMMENT 'Specifies whether the item is active or not',
  PRIMARY KEY (`Cart_ID`),
  KEY `fk_cart_UID` (`User_ID`),
  KEY `pro_id` (`pro_id`),
  KEY `pro_id_2` (`pro_id`),
  KEY `pro_id_3` (`pro_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`Cart_ID`, `pro_id`, `User_ID`, `qty`, `timestamp`, `expired`) VALUES
(1, 1, 2, 1, '2016-04-12 00:07:15', 1),
(2, 6, 2, 1, '2016-04-12 22:44:14', 0);

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
(2, 'Computers And Office'),
(3, 'Mobiles And Tablets'),
(4, 'Home And Kitchen'),
(5, 'Men''s Fashion'),
(6, 'Women''s Fashion'),
(7, 'Babies And Kids Care'),
(8, 'Books And Media'),
(9, 'Automobiles And accessories'),
(10, 'Sports And Outdoors');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `Order_ID` int(255) NOT NULL AUTO_INCREMENT COMMENT 'ID of the Order items',
  `pro_id` int(255) NOT NULL COMMENT 'ID of the Product in the order',
  `User_ID` int(255) NOT NULL COMMENT 'ID of the User who put this product in the order',
  `status` text NOT NULL COMMENT 'Specifies wat the order status is.',
  PRIMARY KEY (`Order_ID`),
  KEY `fk_order_PID` (`pro_id`),
  KEY `fk_order_UID` (`User_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`Order_ID`, `pro_id`, `User_ID`, `status`) VALUES
(1, 1, 2, 'Processing'),
(2, 8, 2, 'Delivered'),
(3, 9, 2, 'Processing');

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
  `shop_id` int(255) NOT NULL COMMENT 'Id of the shop the product belongs to',
  `time_added` timestamp NOT NULL COMMENT 'Time and Date at which the product was added',
  `launch_date` date DEFAULT NULL COMMENT 'Launch Date of certain products.',
  `product_keywords` text NOT NULL COMMENT 'Product Keywords',
  `Inactive` tinyint(1) NOT NULL COMMENT 'Specifies the product is active or no.',
  PRIMARY KEY (`product_id`),
  KEY `fkprocat` (`product_cat`),
  KEY `fkprobrand` (`product_brand`),
  KEY `fk_shop_PID` (`shop_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_cat`, `product_brand`, `product_title`, `product_price`, `product_descrp`, `product_image`, `shop_id`, `time_added`, `launch_date`, `product_keywords`, `Inactive`) VALUES
(1, 3, 2, 'Samsung Galaxy S6 Edge Plus', 53900, '16MP primary camera with LED flash, auto focus and 5MP front facing camera~5.7-inch (14.47 centimeters) quad HD capacitive touchscreen with 2560 x 1440 pixels resolution and 518 ppi pixel density~Android v5.1 Lollipop operating system with 2.1GHz quad core + 1.5GHz quad core processor, 4GB RAM, 32GB internal memory and single SIM~3000mAH lithium-ion battery~1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase', 'S6_Plus.jpg', 1, '0000-00-00 00:00:00', NULL, 'samsung,android,S6 Edge Plus', 0),
(2, 3, 4, 'Huawei Nexus 6P', 39990, 'Huawei Google Nexus 6P smartphone was launched in October 2015~ The phone comes with a 5.7-inch touchscreen display with a resolution of 1440 pixels by 2560 pixels at a PPI of 518 pixels per inch~ The Huawei Google Nexus 6P is powered by 2GHz octa-core Qualcomm Snapdragon 810 processor and it comes with 3GB of RAM~ The phone packs 32GB of internal storage cannot be expanded~ As far as the cameras are concerned the Huawei Google Nexus 6P packs a 12.3-megapixel primary camera on the rear and a 8-megapixel front shooter for selfies~ The Huawei Google Nexus 6P runs Android 6.0 and is powered by a 3450mAh non removable battery~ It measures 159.30 x 77.80 x 7.30 (height x width x thickness) and weighs 178.00 grams~ The Huawei Google Nexus 6P is a single SIM (GSM) smartphone that accepts a Nano-SIM~ Connectivity options include Wi-Fi, GPS, Bluetooth, NFC, 4G (with support for Band 40 used by some LTE networks in India)~ Sensors on the phone include Proximity sensor, Ambient light sensor, Accelerometer, and Gyroscope', 'nexus_6p.jpg', 1, '0000-00-00 00:00:00', '2016-03-08', 'Nexus 6P,Huawei,Stock Android,Google', 0),
(3, 2, 5, 'DELL XPS 13 ', 127000, 'Intel Core i7 (5th Gen)8 GB DDR3 RAM256 GB SSD', 'dell_xps.jpg', 1, '0000-00-00 00:00:00', NULL, 'Dell laptops, XPS 13, 4k', 0),
(4, 2, 6, 'HP Spectre 13-4013TU x360', 124999, 'Intel Core i7 (5th Gen)8 GB DDR3 RAM256 GB SSD Windows 8.1', 'hp_ultrabook.jpg', 1, '0000-00-00 00:00:00', NULL, 'HP laptops, Spectre 13 x360, 1440p', 0),
(5, 1, 7, 'Sony KLV-40R562C 101.6 cm (40) Full HD Internet LED Television', 48299, ' Type : LED - Display Resolution : 1920 x 1080 ~ Connectivity : 2 X HDMI & 2 X USB ~ Warranty : 1 Year Sony India Warranty ~ Screen Size : 101.6 cm (40) ', 'Sony_KLV_40R562C.jpg', 1, '0000-00-00 00:00:00', NULL, 'Sony TV , 1080p', 0),
(6, 1, 8, 'Onida 1.0 Ton 3 Star W123TRD Trendy Plus Window Air Conditioner', 22631, ' 100 % Original Product with Brand Warranty 1+5 Years Warranty ~ NO-HASSLES INSTALLATION SUPPORT !  We give you an Installation Helpline upon Delivery for a seamless, quick installation. ~ Auto Air Swing ~ Turbo Cleane-Saver ~ Sleep Mode ', 'Onida_1_Ton.jpg', 1, '0000-00-00 00:00:00', NULL, 'Onida AC , 1 TON', 0),
(7, 4, 9, 'Aqua 18 Ltr Aqua Supreme Ro+uv+uf+tds Water Purifiers', 3850, ' Stage Purification Process : 5 ~ Electricity Required : Yes ~ Capacity : 5-15 Ltr ~ Auto Shut Off : Yes ~ Type : RO ', 'Aqua_18Ltr.jpg', 2, '0000-00-00 00:00:00', NULL, 'Aqua purifier, 18 Ltr', 0),
(8, 4, 10, 'Comfylite Pillows (Set of 2)', 499, ' Set Contents : Pillows - Colour : White ~ Pillow Cover Length in inches : 24 inches ~ Pillow Cover Width in inches : 16 inches ~ Cover Material : Micro Polyester ', 'Comfylite-Pillows.jpg', 2, '0000-00-00 00:00:00', NULL, 'Comfylite Pillows ,(Set of 2)', 0),
(9, 10, 11, 'Hero Green & Black Next 26T 18 Speed Sprint Bicycle', 6530, ' Brand : Hero Product Type : Bicycle Features : Light in weight Moves swiftly over dirt and debris Others : Comfortable seat Easy on legs and ankles SUPC: SDL240540072 ', 'Hero-Green.jpg', 2, '0000-00-00 00:00:00', NULL, 'Hero cycles, green & black', 0),
(10, 10, 12, 'Kamachi 6 in 1 Manual Treadmill', 15995, ' Training for the game of life - This is a heavy product and might take longer than usual to get delivered ~ Compact & foldable ~ Product Type: Manual Treadmill ~ Easy to store ', 'Kamachi-6-in-1.jpg', 2, '2016-02-23 06:53:31', NULL, 'Kamachi , Manual Treadmill', 0),
(11, 3, 2, 'Samsung S6 32 GB', 40000, '  1 year brand warranty~ 12.95 cm (5.1) Full HD Super AMOLED Display~ Quad-core 1.5 GHz Cortex-A53 & Quad-core 2.1 GHz Cortex-A57 Processor~ 32 GB ROM / 3 GB RAM~ 16 MP Rear / 5 MP Front~ Android OS, v5.0.2 Lollipop~ Non-removable Li-Ion 2550 mAh battery~ Barometer, heart rate, SpO2 Senor~ SUPC: SDL634417341~ ', 'S6.jpg', 1, '2016-03-31 22:13:31', '2016-01-20', 'samsung,android,S6 ', 0),
(13, 3, 13, 'Lenovo Vibe K5 Plus', 8500, '<p>Display : 5.5 inch display ~</p>\n<p>Ram : 2 GB ~</p>\n<p>Storage : 16 GB ~</p>', 'lenovo_vibe_k5_plus.jpeg', 2, '2016-04-17 06:24:56', '2016-04-07', 'Lenovo , K5 Plus , android , phone , 5.1.1', 0);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE IF NOT EXISTS `reviews` (
  `review_id` int(255) NOT NULL AUTO_INCREMENT COMMENT 'ID of the Reviews',
  `pro_ID` int(255) NOT NULL COMMENT 'ID of the Product on which the review is posted.',
  `review_title` varchar(255) NOT NULL COMMENT 'Title of the review',
  `review_userID` int(255) NOT NULL COMMENT 'ID of the User who wrote this review',
  `review_content` varchar(255) NOT NULL COMMENT 'Content of the review',
  `review_date` timestamp NOT NULL COMMENT 'Time stamp of when the review was posted',
  `rating` int(255) NOT NULL COMMENT 'Rating given by the user in the review',
  PRIMARY KEY (`review_id`),
  KEY `fk_review_PID` (`pro_ID`),
  KEY `fk_review_UID` (`review_userID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`review_id`, `pro_ID`, `review_title`, `review_userID`, `review_content`, `review_date`, `rating`) VALUES
(1, 1, 'Best Phone', 2, 'Very gud fone .This allows me to study.', '2016-04-12 17:09:17', 4),
(2, 2, 'Awesome Phone yaarr', 2, 'SUperb phone very good buy', '2016-03-30 02:30:58', 4),
(3, 6, 'Amazing', 2, 'Just amazing how good the cooling is .', '2016-04-15 06:23:13', 4);

-- --------------------------------------------------------

--
-- Table structure for table `shops`
--

CREATE TABLE IF NOT EXISTS `shops` (
  `shop_id` int(255) NOT NULL AUTO_INCREMENT COMMENT 'ID of the shop',
  `shop_name` varchar(255) NOT NULL COMMENT 'Name of the shop',
  `area_name` varchar(255) NOT NULL COMMENT 'Name of the sub-district where your shop resides.(For ex. naigoan)',
  `owner_name` varchar(255) NOT NULL COMMENT 'Name of the owner(s) of the shop.',
  `shop_image` text NOT NULL COMMENT 'name of the image file',
  `Inactive` tinyint(1) NOT NULL COMMENT 'Specifies whether the shop is active or not',
  PRIMARY KEY (`shop_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `shops`
--

INSERT INTO `shops` (`shop_id`, `shop_name`, `area_name`, `owner_name`, `shop_image`, `Inactive`) VALUES
(1, 'Ram Electronics', 'Vasai', 'Ram Pandit', 'Ram_Electronics.jpg', 0),
(2, 'Comfort Home', 'Mumbai', 'Umesh Navadia', 'Comfort_home.png', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `User_ID` int(255) NOT NULL AUTO_INCREMENT COMMENT 'ID of the User',
  `UName` varchar(255) NOT NULL COMMENT 'User Name',
  `Email_address` varchar(255) NOT NULL COMMENT 'Email Address of the User',
  `Password` varchar(255) NOT NULL COMMENT 'Password of the User(Encrypted)',
  `shop_id` int(255) DEFAULT NULL COMMENT 'ID of the shop if the user has a shop else its null',
  `Mobile_no` text NOT NULL COMMENT 'Mobile number of the user',
  `Address` varchar(255) NOT NULL COMMENT 'Home Address of the user',
  `Pin_code` int(11) NOT NULL COMMENT 'Pin Code of the User''s home Address',
  `fName` varchar(255) NOT NULL COMMENT 'First Name of the User',
  `lName` varchar(255) NOT NULL COMMENT 'Last Name of the User',
  `Gender` text NOT NULL COMMENT 'The Gender of the user',
  `type` varchar(10) NOT NULL COMMENT 'Specifies the type of user.',
  `Active` tinyint(1) NOT NULL COMMENT 'Specifies whether the user is active or not',
  PRIMARY KEY (`User_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`User_ID`, `UName`, `Email_address`, `Password`, `shop_id`, `Mobile_no`, `Address`, `Pin_code`, `fName`, `lName`, `Gender`, `type`, `Active`) VALUES
(1, 'root', '', 'a123456', NULL, '2147483647', '4/A, Old Barampur, Near st.Michael Church , Vasai (W) ', 123456, 'Admin', '', 'Male', 'admin', 1),
(2, 'Ave', 'avian@gmail.com', 'admin6', NULL, '7875089271', 'Kiravli , Papdi, Vasai(W)', 401202, 'Ave', 'Silvi', 'Male', 'normal', 1),
(3, 'UmeshB2', 'umesh.navadia@gmail.com', 's123456', 2, '', '', 123465, 'Umesh', '', '', 'seller', 1);

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
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_order_PID` FOREIGN KEY (`pro_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `fk_order_UID` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fkprobrand` FOREIGN KEY (`product_brand`) REFERENCES `brands` (`brand_id`),
  ADD CONSTRAINT `fkprocat` FOREIGN KEY (`product_cat`) REFERENCES `categories` (`cat_id`),
  ADD CONSTRAINT `fk_shop_PID` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`shop_id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `fk_review_PID` FOREIGN KEY (`pro_ID`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `fk_review_UID` FOREIGN KEY (`review_userID`) REFERENCES `user` (`User_ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
