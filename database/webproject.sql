-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 21, 2021 at 03:26 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `documenttable`
--

CREATE TABLE `documenttable` (
  `id` varchar(20) NOT NULL,
  `class` varchar(50) NOT NULL,
  `innervalue` varchar(255) NOT NULL,
  `owner` varchar(30) NOT NULL,
  `style` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(30) NOT NULL,
  `type` enum('RegisteredUser','Administrator') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `type`) VALUES
(1, 'user1', '$2y$10$Z3E2Plnr0oipbaGn/NzyqOlSW7VlHpKFYxPTm/zOMNuZm1eUx.b3G', 'asdf@a.a', 'RegisteredUser'),
(2, 'user', '$2y$10$KmT1GI2WVuUDRTkxKqxNP.fgMXjnwSu1sifZpM.LYo9IuK7XGI7K2', 'asdf@a.a', 'RegisteredUser'),
(3, 'user3', '$2y$10$pD2cL3RL0sUgsbo18OSIfu5yqkYcgh9JsUrNbanUe3oIpuxKIn1ky', 'asdf@a.a', 'Administrator'),
(6, 'admin', '$2y$10$iIH1U2LEurc.oL/m.kUMjeDBfq1jbY0WytVfKESOvcxMEkD0uyhti', 'asdf@a.a', 'Administrator');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `documenttable`
--
ALTER TABLE `documenttable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;