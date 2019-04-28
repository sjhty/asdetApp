-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2019-04-28 15:01:38
-- 服务器版本： 5.7.17-log
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `asdet_app_data`
--

-- --------------------------------------------------------

--
-- 表的结构 `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `minister_price` double DEFAULT NULL,
  `director_price` double DEFAULT NULL,
  `president_price` double DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `category`
--

INSERT INTO `category` (`id`, `name`, `price`, `minister_price`, `director_price`, `president_price`, `created_at`) VALUES
(1, '樱桃裤', 198, 125, 110, 100, NULL),
(2, '坚果裤', 208, 125, 110, 100, NULL),
(3, '樱桃MINI裤', 158, 90, 80, 70, NULL),
(4, '樱桃裤PLUS', 188, 115, 100, 90, NULL),
(5, '樱桃纤体塑养裤', 218, 115, 100, 90, NULL),
(6, '樱桃纤体塑养衣', 488, 260, 220, 200, NULL),
(7, '樱桃能量塑养衣', 1288, 540, 460, 420, NULL),
(8, '樱桃能量塑养裤', 688, 340, 300, 280, NULL),
(9, '蜜桃润肤内衣', 228, 125, 110, 100, NULL),
(10, '坚果润肤内衣', 238, 135, 120, 110, NULL),
(11, '樱桃铂金焕肤内衣', 258, 145, 130, 120, NULL),
(12, '坚果铂金焕肤内衣', 288, 175, 160, 150, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `attribute` varchar(200) DEFAULT NULL,
  `imgUrl` varchar(200) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `products`
--

INSERT INTO `products` (`id`, `name`, `category_id`, `attribute`, `imgUrl`, `stock`, `created_at`) VALUES
(45, '优艾樱桃裤', 1, 'A款 M', 'null', 0, '2019-01-10 22:45:36'),
(46, '优艾樱桃裤', 1, 'A款 L', 'null', 25, '2019-01-10 22:46:28'),
(47, '优艾樱桃裤', 1, 'A款 XL', NULL, 12, '2019-01-10 22:47:04'),
(48, '优艾樱桃裤', 1, 'B款 M', 'null', 22, '2019-01-10 22:47:43'),
(49, '优艾樱桃裤', 1, 'B款 L', 'null', 4, '2019-01-10 22:48:06'),
(50, '优艾樱桃裤', 1, 'B款 XL', 'null', 16, '2019-01-10 22:48:46'),
(51, '优艾樱桃裤PLUS', 4, 'A款 L', 'null', 18, '2019-01-10 22:49:46'),
(52, '优艾樱桃裤PLUS', 4, 'A款 XL', 'null', 12, '2019-01-10 22:50:20'),
(53, '优艾樱桃裤PLUS', 4, 'B款 L', 'null', 15, '2019-01-10 22:51:05'),
(54, '优艾樱桃裤PLUS', 4, 'B款 XL', 'null', 14, '2019-01-10 22:51:35'),
(55, '优艾坚果裤', 2, 'A款 XL', 'null', 6, '2019-01-10 22:52:25'),
(56, '优艾坚果裤', 2, 'A款 XXL', 'null', 9, '2019-01-10 22:52:53'),
(57, '优艾坚果裤', 2, 'B款 XL', 'null', 14, '2019-01-10 22:53:22'),
(58, '优艾坚果裤', 2, 'B款 XXL', 'null', 11, '2019-01-10 22:54:15'),
(59, '优艾能量塑养衣', 7, '肤色 M', 'null', 6, '2019-01-11 21:47:10'),
(60, '优艾能量塑养衣', 7, '肤色 L', 'null', 5, '2019-01-11 21:47:46'),
(61, '优艾能量塑养衣', 7, '黑色 M', 'null', 14, '2019-01-11 21:57:08'),
(62, '优艾能量塑养衣', 7, '黑色 L', 'null', 7, '2019-01-11 21:58:05'),
(63, '优艾纤体塑养衣', 6, '肤色 M', 'null', 5, '2019-01-11 22:00:35'),
(64, '优艾纤体塑养衣', 6, '肤色 L', NULL, 2, '2019-01-11 22:01:16'),
(65, '优艾纤体塑养衣', 6, '黑色 M', 'null', 0, '2019-01-11 22:02:08'),
(66, '优艾纤体塑养衣', 6, '黑色 L', 'null', 2, '2019-01-11 22:02:41'),
(67, '优艾能量塑养裤', 8, '黑色 M', 'null', 14, '2019-01-11 22:04:16'),
(68, '优艾能量塑养裤', 8, '黑色 L', 'null', 2, '2019-01-11 22:04:44'),
(69, '优艾纤体塑养裤', 5, '肤色 M', 'null', 3, '2019-01-11 22:06:28'),
(70, '优艾纤体塑养裤', 5, '肤色 L', 'null', 9, '2019-01-11 22:06:54'),
(71, '优艾纤体塑养裤', 5, '黑色 M', 'null', 0, '2019-01-11 22:07:21'),
(72, '优艾纤体塑养裤', 5, '黑色 L', 'null', 6, '2019-01-11 22:08:10'),
(73, '优艾樱桃铂金焕肤内衣', 11, '肤色 M', 'null', 0, '2019-01-11 22:13:34'),
(74, '优艾樱桃铂金焕肤内衣', 11, '肤色 L', NULL, 0, '2019-01-11 22:14:20'),
(75, '优艾樱桃铂金焕肤内衣', 11, '黑色 M', 'null', 7, '2019-01-11 22:15:03'),
(76, '优艾樱桃铂金焕肤内衣', 11, '黑色 L', 'null', 0, '2019-01-11 22:15:49'),
(77, '优艾坚果铂金焕肤内衣', 12, '蓝色 L', NULL, 6, '2019-01-11 22:17:46'),
(78, '优艾坚果铂金焕肤内衣', 12, '蓝色 XL', NULL, 0, '2019-01-11 22:18:29'),
(79, '优艾坚果铂金焕肤内衣', 12, '灰色 L', 'null', 17, '2019-01-11 22:19:13'),
(80, '优艾坚果铂金焕肤内衣', 12, '灰色 XL', 'null', 5, '2019-01-11 22:19:44'),
(81, '优艾蜜桃润肤内衣', 9, '黑色 ', 'null', 7, '2019-01-11 22:22:13'),
(82, '优艾樱桃MINI裤', 3, 'A款  S', 'null', 20, '2019-01-11 22:23:51'),
(83, '优艾樱桃MINI裤', 3, 'A款 M', 'null', 0, '2019-01-11 22:24:30'),
(84, '优艾樱桃MINI裤', 3, 'B款 S', 'null', 19, '2019-01-11 22:25:08'),
(85, '优艾樱桃MINI裤', 3, 'B款 M', 'null', 0, '2019-01-11 22:25:50'),
(86, '测试商品', 1, '测试商品', 'null', 90, '2019-03-17 20:49:15'),
(87, '优艾坚果裤', 2, 'B款 XXXL', 'null', 8, '2019-04-07 18:34:49'),
(88, '优艾坚果裤', 2, 'A款 XXXL', NULL, 2, '2019-04-07 20:51:56');

-- --------------------------------------------------------

--
-- 表的结构 `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20190410030751-init-users.js'),
('20190411013657-init-products.js'),
('20190411021249-init-category.js');

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- 使用表AUTO_INCREMENT `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;
--
-- 使用表AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
