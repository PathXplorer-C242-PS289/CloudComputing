-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 19, 2024 at 06:38 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pathxplorer`
--

-- --------------------------------------------------------

--
-- Table structure for table `blacklist`
--

CREATE TABLE `blacklist` (
  `id` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `blacklisted_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `blacklist`
--

INSERT INTO `blacklist` (`id`, `token`, `blacklisted_at`) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R1c2VyQGV4YW1wbGUuY29tIiwiaWQiOjEsImlhdCI6MTczMTkwNzI0NSwiZXhwIjoxNzMxOTEwODQ1fQ.gLQD1kudrXjbRmSglJ6pKlkFYctNNgVngUrAiqTXUuw', '2024-11-18 05:21:07'),
(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R1c2VyQGV4YW1wbGUuY29tIiwiaWQiOjEsImlhdCI6MTczMTkwNzMxOSwiZXhwIjoxNzMxOTEwOTE5fQ.Vt6t99Got-oBoqljfXSMjbR-KifRG0YGzT_mNuZvC20', '2024-11-18 05:22:08');

-- --------------------------------------------------------

--
-- Table structure for table `majors`
--

CREATE TABLE `majors` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `majors`
--

INSERT INTO `majors` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Computer Science', 'Study of computation and programming.', '2024-11-19 13:10:55', '2024-11-19 13:10:55'),
(2, 'Business Management', 'Focus on business operations and strategy.', '2024-11-19 13:10:55', '2024-11-19 13:10:55'),
(3, 'Psychology', 'Understanding human behavior and mental processes.', '2024-11-19 13:10:55', '2024-11-19 13:10:55'),
(4, 'Graphic Design', 'Artistic and creative visual communication.', '2024-11-19 13:10:55', '2024-11-19 13:10:55'),
(5, 'Mechanical Engineering', 'Design and manufacturing of mechanical systems.', '2024-11-19 13:10:55', '2024-11-19 13:10:55');

-- --------------------------------------------------------

--
-- Table structure for table `major_recommendations`
--

CREATE TABLE `major_recommendations` (
  `id` int NOT NULL,
  `major_id` int NOT NULL,
  `realistic_min` float DEFAULT NULL,
  `realistic_max` float DEFAULT NULL,
  `investigative_min` float DEFAULT NULL,
  `investigative_max` float DEFAULT NULL,
  `artistic_min` float DEFAULT NULL,
  `artistic_max` float DEFAULT NULL,
  `social_min` float DEFAULT NULL,
  `social_max` float DEFAULT NULL,
  `enterprising_min` float DEFAULT NULL,
  `enterprising_max` float DEFAULT NULL,
  `conventional_min` float DEFAULT NULL,
  `conventional_max` float DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `major_recommendations`
--

INSERT INTO `major_recommendations` (`id`, `major_id`, `realistic_min`, `realistic_max`, `investigative_min`, `investigative_max`, `artistic_min`, `artistic_max`, `social_min`, `social_max`, `enterprising_min`, `enterprising_max`, `conventional_min`, `conventional_max`, `created_at`, `updated_at`) VALUES
(1, 1, 30, 60, 50, 80, 10, 30, 20, 40, 20, 50, 10, 40, '2024-11-19 13:12:07', '2024-11-19 13:12:07'),
(2, 2, 20, 40, 20, 40, 10, 30, 30, 60, 50, 80, 20, 50, '2024-11-19 13:12:07', '2024-11-19 13:12:07'),
(3, 3, 10, 30, 40, 70, 20, 40, 50, 80, 20, 50, 30, 60, '2024-11-19 13:12:07', '2024-11-19 13:12:07'),
(4, 4, 10, 30, 10, 40, 50, 80, 20, 50, 20, 40, 10, 30, '2024-11-19 13:12:07', '2024-11-19 13:12:07'),
(5, 5, 50, 80, 30, 60, 10, 20, 10, 30, 20, 50, 40, 70, '2024-11-19 13:12:07', '2024-11-19 13:12:07');

-- --------------------------------------------------------

--
-- Table structure for table `otp`
--

CREATE TABLE `otp` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `otp_code` varchar(6) NOT NULL,
  `expired_at` datetime NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `otp`
--

INSERT INTO `otp` (`id`, `user_id`, `otp_code`, `expired_at`, `created_at`) VALUES
(1, 1, '195486', '2024-11-18 11:38:34', '2024-11-18 00:18:35'),
(2, 1, '228856', '2024-11-18 11:38:34', '2024-11-18 00:20:32'),
(3, 2, '219893', '2024-11-18 11:46:56', '2024-11-18 11:34:37'),
(4, 1, '421908', '2024-11-18 12:38:34', '2024-11-18 11:38:34'),
(5, 2, '599108', '2024-11-18 12:46:57', '2024-11-18 11:46:56'),
(6, 3, '891745', '2024-11-19 12:32:25', '2024-11-19 11:32:25'),
(7, 4, '714452', '2024-11-19 12:42:26', '2024-11-19 11:42:26'),
(8, 5, '244343', '2024-11-19 12:46:49', '2024-11-19 11:46:49'),
(9, 6, '823455', '2024-11-19 14:13:48', '2024-11-19 13:13:47');

-- --------------------------------------------------------

--
-- Table structure for table `riasec_answers`
--

CREATE TABLE `riasec_answers` (
  `id` int NOT NULL,
  `session_id` int NOT NULL,
  `question_id` int NOT NULL,
  `answer` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `riasec_answers`
--

INSERT INTO `riasec_answers` (`id`, `session_id`, `question_id`, `answer`, `created_at`) VALUES
(3, 4, 5, 4, '2024-11-19 11:37:28'),
(5, 5, 1, 4, '2024-11-19 11:43:25'),
(6, 5, 2, 4, '2024-11-19 11:43:31'),
(7, 5, 3, 5, '2024-11-19 11:43:36'),
(8, 6, 1, 5, '2024-11-19 11:45:58'),
(9, 6, 2, 5, '2024-11-19 11:46:03'),
(10, 6, 3, 5, '2024-11-19 11:46:06'),
(11, 6, 4, 5, '2024-11-19 11:46:10'),
(12, 6, 5, 5, '2024-11-19 11:46:14'),
(13, 7, 1, 1, '2024-11-19 11:47:38'),
(14, 7, 2, 2, '2024-11-19 11:47:41'),
(15, 7, 3, 3, '2024-11-19 11:47:45'),
(16, 7, 4, 4, '2024-11-19 11:47:49'),
(17, 7, 5, 5, '2024-11-19 11:47:53'),
(18, 7, 6, 5, '2024-11-19 11:48:52'),
(19, 8, 1, 50, '2024-11-19 13:15:42'),
(20, 8, 2, 70, '2024-11-19 13:16:00'),
(21, 8, 3, 20, '2024-11-19 13:16:07'),
(22, 8, 4, 30, '2024-11-19 13:16:34'),
(23, 8, 5, 40, '2024-11-19 13:16:44'),
(24, 8, 6, 35, '2024-11-19 13:16:51');

-- --------------------------------------------------------

--
-- Table structure for table `riasec_questions`
--

CREATE TABLE `riasec_questions` (
  `id` int NOT NULL,
  `question_text` text NOT NULL,
  `riasec_type` enum('realistic','investigative','artistic','social','enterprising','conventional') NOT NULL,
  `question_index` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `riasec_questions`
--

INSERT INTO `riasec_questions` (`id`, `question_text`, `riasec_type`, `question_index`, `created_at`, `updated_at`) VALUES
(1, 'Saya menikmati bekerja dengan alat dan mesin.', 'realistic', 1, '2024-11-19 11:37:22', '2024-11-19 11:37:22'),
(2, 'Saya suka melakukan eksperimen atau penelitian.', 'investigative', 2, '2024-11-19 11:37:22', '2024-11-19 11:37:22'),
(3, 'Saya menikmati menulis cerita, puisi, atau artikel.', 'artistic', 3, '2024-11-19 11:37:22', '2024-11-19 11:37:22'),
(4, 'Saya merasa nyaman membantu orang lain dengan masalah mereka.', 'social', 4, '2024-11-19 11:37:22', '2024-11-19 11:37:22'),
(5, 'Saya senang memimpin proyek atau tim.', 'enterprising', 5, '2024-11-19 11:37:22', '2024-11-19 11:37:22'),
(6, 'Saya menyukai pekerjaan yang terorganisasi dan detail.', 'conventional', 6, '2024-11-19 11:37:22', '2024-11-19 11:37:22'),
(7, 'Saya suka memperbaiki barang yang rusak.', 'realistic', 7, '2024-11-19 11:37:22', '2024-11-19 11:37:22'),
(8, 'Saya menikmati memecahkan masalah matematika atau sains.', 'investigative', 8, '2024-11-19 11:37:22', '2024-11-19 11:37:22'),
(9, 'Saya suka menggambar atau mendesain sesuatu.', 'artistic', 9, '2024-11-19 11:37:22', '2024-11-19 11:37:22'),
(10, 'Saya suka mengajar atau melatih orang lain.', 'social', 10, '2024-11-19 11:37:22', '2024-11-19 11:37:22'),
(11, 'Saya tertarik pada pemasaran dan negosiasi.', 'enterprising', 11, '2024-11-19 11:37:22', '2024-11-19 11:37:22'),
(12, 'Saya merasa puas saat mengelola dokumen dan data.', 'conventional', 12, '2024-11-19 11:37:22', '2024-11-19 11:37:22');

-- --------------------------------------------------------

--
-- Table structure for table `riasec_results`
--

CREATE TABLE `riasec_results` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `realistic` float NOT NULL,
  `investigative` float NOT NULL,
  `artistic` float NOT NULL,
  `social` float NOT NULL,
  `enterprising` float NOT NULL,
  `conventional` float NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `riasec_results`
--

INSERT INTO `riasec_results` (`id`, `user_id`, `realistic`, `investigative`, `artistic`, `social`, `enterprising`, `conventional`, `createdAt`, `updatedAt`, `created_at`) VALUES
(1, 1, 3.5, 4.2, 3, 4.5, 2.8, 3.7, '2024-11-19 08:59:27', '2024-11-19 08:59:27', '2024-11-19 13:09:20'),
(2, 2, 4.5, 1.2, 2, 4.2, 1.8, 7.1, '2024-11-19 09:04:41', '2024-11-19 09:04:41', '2024-11-19 13:09:20'),
(4, 1, 4.5, 1.2, 2, 4.2, 1.8, 7.1, '2024-11-19 09:08:05', '2024-11-19 09:08:05', '2024-11-19 13:09:20'),
(6, 6, 50, 70, 20, 30, 40, 35, '2024-11-19 13:20:21', '2024-11-19 13:20:21', '2024-11-19 13:20:21');

-- --------------------------------------------------------

--
-- Table structure for table `riasec_sessions`
--

CREATE TABLE `riasec_sessions` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `start_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_time` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `riasec_sessions`
--

INSERT INTO `riasec_sessions` (`id`, `user_id`, `start_time`, `end_time`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2024-11-19 10:17:48', '2024-11-19 10:29:26', '2024-11-19 10:17:48', '2024-11-19 10:29:26'),
(3, 2, '2024-11-19 10:29:51', NULL, '2024-11-19 10:29:51', '2024-11-19 10:29:51'),
(4, 3, '2024-11-19 11:33:27', NULL, '2024-11-19 11:33:27', '2024-11-19 11:33:27'),
(5, 4, '2024-11-19 11:43:00', '2024-11-19 11:43:58', '2024-11-19 11:43:00', '2024-11-19 11:43:58'),
(6, 1, '2024-11-19 11:45:42', '2024-11-19 11:46:38', '2024-11-19 11:45:42', '2024-11-19 11:46:38'),
(7, 5, '2024-11-19 11:47:24', '2024-11-19 11:48:05', '2024-11-19 11:47:24', '2024-11-19 11:48:05'),
(8, 6, '2024-11-19 13:14:25', '2024-11-19 13:20:21', '2024-11-19 13:14:25', '2024-11-19 13:20:21');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `verified_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `password`, `verified_at`, `created_at`, `updated_at`) VALUES
(1, 'testuser@example.com', '$2b$10$UHKeIDuTSL4NMayv7N3a9.aEavRpleH8yLm69uf0UEF5aN1sM124a', '2024-11-18 00:21:16', '2024-11-18 00:18:35', '2024-11-18 00:21:16'),
(2, 'satutukeveryone@gmail.com', '$2b$10$FFlUbhIqE3HkyIesLBcC5e3NZ/vjND4n8pWWUza9Lbmq6bdtDRwD.', '2024-11-18 11:47:33', '2024-11-18 11:34:37', '2024-11-18 11:47:33'),
(3, 'user2@example.com', '$2b$10$c36.j/StB816Kc5wXCYM2.BF.ZjitUTcl0.WeQK/m6Gb00i8JtuG2', '2024-11-19 11:33:02', '2024-11-19 11:32:25', '2024-11-19 11:33:02'),
(4, 'user3@example.com', '$2b$10$2wFQpASc8JcXUNZEFxg/7uWKt7BtdfOwIq5zRzPTGZRyI2Sng9Opy', '2024-11-19 11:42:50', '2024-11-19 11:42:26', '2024-11-19 11:42:50'),
(5, 'user4@example.com', '$2b$10$jFyBQta4eCYeSYdn8MporeNKFfd1WdeRIhXRoeZAbY4UHXG.CYBEm', '2024-11-19 11:47:11', '2024-11-19 11:46:49', '2024-11-19 11:47:11'),
(6, 'user5@example.com', '$2b$10$8FA81v/RFa.9eQ396glTy.aJX3o4VNUzT/ufEaQvDKvFO28gXhI62', '2024-11-19 13:14:12', '2024-11-19 13:13:47', '2024-11-19 13:14:12');

-- --------------------------------------------------------

--
-- Table structure for table `user_recommendations`
--

CREATE TABLE `user_recommendations` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `major_id` int NOT NULL,
  `recommendation_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `result_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blacklist`
--
ALTER TABLE `blacklist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `majors`
--
ALTER TABLE `majors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `major_recommendations`
--
ALTER TABLE `major_recommendations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `major_id` (`major_id`);

--
-- Indexes for table `otp`
--
ALTER TABLE `otp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `riasec_answers`
--
ALTER TABLE `riasec_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `session_id` (`session_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `riasec_questions`
--
ALTER TABLE `riasec_questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `riasec_results`
--
ALTER TABLE `riasec_results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `riasec_sessions`
--
ALTER TABLE `riasec_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_recommendations`
--
ALTER TABLE `user_recommendations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `major_id` (`major_id`),
  ADD KEY `fk_result_id` (`result_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blacklist`
--
ALTER TABLE `blacklist`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `majors`
--
ALTER TABLE `majors`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `major_recommendations`
--
ALTER TABLE `major_recommendations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `otp`
--
ALTER TABLE `otp`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `riasec_answers`
--
ALTER TABLE `riasec_answers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `riasec_questions`
--
ALTER TABLE `riasec_questions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `riasec_results`
--
ALTER TABLE `riasec_results`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `riasec_sessions`
--
ALTER TABLE `riasec_sessions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user_recommendations`
--
ALTER TABLE `user_recommendations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `major_recommendations`
--
ALTER TABLE `major_recommendations`
  ADD CONSTRAINT `major_recommendations_ibfk_1` FOREIGN KEY (`major_id`) REFERENCES `majors` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `otp`
--
ALTER TABLE `otp`
  ADD CONSTRAINT `otp_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `riasec_answers`
--
ALTER TABLE `riasec_answers`
  ADD CONSTRAINT `riasec_answers_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `riasec_sessions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `riasec_answers_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `riasec_questions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `riasec_results`
--
ALTER TABLE `riasec_results`
  ADD CONSTRAINT `riasec_results_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `riasec_sessions`
--
ALTER TABLE `riasec_sessions`
  ADD CONSTRAINT `riasec_sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `user_recommendations`
--
ALTER TABLE `user_recommendations`
  ADD CONSTRAINT `fk_result_id` FOREIGN KEY (`result_id`) REFERENCES `riasec_results` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_recommendations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_recommendations_ibfk_2` FOREIGN KEY (`major_id`) REFERENCES `majors` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
