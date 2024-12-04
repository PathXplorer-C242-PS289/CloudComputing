-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 04, 2024 at 05:59 PM
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
-- Table structure for table `careers`
--

CREATE TABLE `careers` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `careers`
--

INSERT INTO `careers` (`id`, `name`, `description`) VALUES
(1, 'Agriculture', NULL),
(2, 'Architect', NULL),
(3, 'Athletics', NULL),
(4, 'Carpenter', NULL),
(5, 'Culinary arts', NULL),
(6, 'Chef', NULL),
(7, 'Chemist', NULL),
(8, 'Computer engineer', NULL),
(9, 'Computer programmer', NULL),
(10, 'Dentist', NULL),
(11, 'Engineer', NULL),
(12, 'Fashion design', NULL),
(13, 'Firefighter', NULL),
(14, 'Graphic designer', NULL),
(15, 'Model', NULL),
(16, 'Musician', NULL),
(17, 'Nurse', NULL),
(18, 'Outdoor recreation', NULL),
(19, 'Park Naturalist', NULL),
(20, 'Personal trainer', NULL),
(21, 'Photographer', NULL),
(22, 'Physical therapy', NULL),
(23, 'Driver', NULL),
(24, 'Sports medicine', NULL),
(25, 'Wilderness medicine', NULL),
(26, 'Surgeon', NULL),
(27, 'Veterinarian', NULL),
(28, 'Web developer', NULL),
(29, 'Zoologists', NULL),
(30, 'Wildlife Biologists', NULL),
(31, 'Actuary', NULL),
(32, 'Archivist', NULL),
(33, 'Librarian', NULL),
(34, 'Biostatistics', NULL),
(35, 'Accountant', NULL),
(36, 'Community Health Workers', NULL),
(37, 'Counselor', NULL),
(38, 'Dietitian', NULL),
(39, 'Nutritionist', NULL),
(40, 'Doctor', NULL),
(41, 'Medical research', NULL),
(42, 'Economics major', NULL),
(43, 'Financial analyst', NULL),
(44, 'Epidemiology', NULL),
(45, 'Lawyer', NULL),
(46, 'Paralegal', NULL),
(47, 'Pharmacist', NULL),
(48, 'Physics', NULL),
(49, 'Poets', NULL),
(50, 'Lyricists', NULL),
(51, 'Creative Writers', NULL),
(52, 'Professor', NULL),
(53, 'Research', NULL),
(54, 'Psychologist', NULL),
(55, 'Art therapist', NULL),
(56, 'Social Worker', NULL),
(57, 'Speech-language pathology', NULL),
(58, 'Myofunctional therapist', NULL),
(59, 'Technical writer', NULL),
(60, 'Proofreader', NULL),
(61, 'Copy Editor', NULL),
(62, 'Tutor', NULL),
(63, 'Broadcast journalism', NULL),
(64, 'Clergy', NULL),
(65, 'School Counselors', NULL),
(66, 'Academic Advisors', NULL),
(67, 'Career Counselors', NULL),
(68, 'Consultants', NULL),
(69, 'Entrepreneur', NULL),
(70, 'Public relations', NULL),
(71, 'Teacher', NULL),
(72, 'Business trainer', NULL),
(73, 'Translator', NULL),
(74, 'Personal Financial Planner', NULL),
(75, 'Community Organizer', NULL),
(76, 'Customer service', NULL),
(77, 'Educational administration', NULL),
(78, 'Human Resources', NULL),
(79, 'Social Advocate', NULL),
(80, 'Sociology', NULL),
(81, 'Advisers', NULL),
(82, 'Business', NULL),
(83, 'Broker', NULL),
(84, 'Diplomacy', NULL),
(85, 'Aerobics Teacher', NULL),
(86, 'Fitness Trainer', NULL),
(87, 'Fundraising', NULL),
(88, 'Manager', NULL),
(89, 'Management Consultant', NULL),
(90, 'Market Research Analyst', NULL),
(91, 'Property manager', NULL),
(92, 'Community association manager', NULL),
(93, 'Advertising', NULL),
(94, 'Marketing', NULL),
(95, 'Sales', NULL),
(96, 'Math teacher', NULL),
(97, 'Office administration', NULL),
(98, 'Real Estate Agent', NULL),
(99, 'Statistician', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `code`, `name`) VALUES
(1, 'R', 'Realistic'),
(2, 'I', 'Investigative'),
(3, 'A', 'Artistic'),
(4, 'S', 'Social'),
(5, 'E', 'Enterprising'),
(6, 'C', 'Conventional');

-- --------------------------------------------------------

--
-- Table structure for table `category_careers`
--

CREATE TABLE `category_careers` (
  `id` int NOT NULL,
  `category_id` int NOT NULL,
  `career_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `category_careers`
--

INSERT INTO `category_careers` (`id`, `category_id`, `career_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 2, 7),
(8, 2, 8),
(9, 2, 9),
(10, 2, 10),
(11, 2, 11),
(12, 1, 12),
(13, 4, 13),
(14, 1, 14),
(15, 1, 15),
(16, 1, 16),
(17, 4, 17),
(18, 1, 18),
(19, 4, 19),
(20, 5, 20),
(21, 1, 21),
(22, 4, 22),
(23, 1, 23),
(24, 4, 24),
(25, 4, 25),
(26, 2, 26),
(27, 2, 27),
(28, 1, 28),
(29, 2, 29),
(30, 2, 30),
(31, 2, 31),
(32, 4, 32),
(33, 4, 33),
(34, 2, 34),
(35, 2, 35),
(36, 4, 36),
(37, 4, 37),
(38, 4, 38),
(39, 4, 39),
(40, 2, 40),
(41, 2, 41),
(42, 2, 42),
(43, 2, 43),
(44, 2, 44),
(45, 2, 45),
(46, 2, 46),
(47, 2, 47),
(48, 2, 48),
(49, 1, 49),
(50, 1, 50),
(51, 1, 51),
(52, 2, 52),
(53, 2, 53),
(54, 4, 54),
(55, 4, 55),
(56, 4, 56),
(57, 4, 57),
(58, 4, 58),
(59, 1, 59),
(60, 1, 60),
(61, 1, 61),
(62, 4, 62),
(63, 5, 63),
(64, 5, 64),
(65, 1, 65),
(66, 1, 66),
(67, 1, 67),
(68, 1, 68),
(69, 5, 69),
(70, 5, 70),
(71, 1, 71),
(72, 1, 72),
(73, 1, 73),
(74, 4, 74),
(75, 4, 75),
(76, 1, 65),
(77, 1, 66),
(78, 1, 67),
(79, 1, 68),
(80, 4, 76),
(81, 4, 77),
(82, 4, 78),
(83, 4, 79),
(84, 4, 80),
(85, 4, 56),
(86, 4, 81),
(87, 5, 82),
(88, 5, 83),
(89, 5, 84),
(90, 5, 85),
(91, 5, 86),
(92, 5, 87),
(93, 5, 88),
(94, 5, 89),
(95, 5, 90),
(96, 5, 91),
(97, 5, 92),
(98, 5, 93),
(99, 5, 94),
(100, 5, 95),
(101, 6, 96),
(102, 6, 97),
(103, 6, 98),
(104, 6, 99);

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
(9, 6, '823455', '2024-11-19 14:13:48', '2024-11-19 13:13:47'),
(10, 7, '832478', '2024-11-20 14:51:49', '2024-11-20 13:51:48');

-- --------------------------------------------------------

--
-- Table structure for table `riasec_details`
--

CREATE TABLE `riasec_details` (
  `id` int NOT NULL,
  `riasec_type` enum('R','I','A','S','E','C') NOT NULL,
  `interest_description` text NOT NULL,
  `key_skills` text NOT NULL,
  `example_careers` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `riasec_details`
--

INSERT INTO `riasec_details` (`id`, `riasec_type`, `interest_description`, `key_skills`, `example_careers`) VALUES
(1, 'R', 'Individuals with the Realistic type are those who enjoy practical, tangible work. They like working with their hands, making, fixing or assembling things, and are often drawn to outdoor activities. This type usually enjoys using tools or machines, building something concrete, or even farming. If you are a Realistic type, you may find satisfaction in a job that allows you to see the immediate results of your efforts. You tend to like working independently or in a structured environment with little social interaction.', 'Operating tools, repairing, designing, manual work, driving, caring for plants or animals.', 'Pilot, Farmer, Engineer, Mechanic'),
(2, 'I', 'People with the Investigative type are highly curious and tend to enjoy exploration, research and complex problem solving. They like activities that require logical analysis, deep thinking or detailed investigation. This type enjoys learning new things, observing and testing theories. If you are an Investigative type, you are likely to be interested in science, technology or jobs that allow you to find answers to challenging questions.', 'Logical thinking, analyzing, diagnosing, writing reports, designing.', 'Scientist, Doctor, Chemist, Lab Technician'),
(3, 'A', 'Artistic individuals are creative souls who love to express themselves through art, music, drama or design. They tend to favor work environments that are flexible, inspiring, and give them the freedom to let their imaginations run wild. If you are an Artistic type, you probably enjoy creating something unique, be it a piece of art, a story, or even a performance on stage. You tend to avoid work that is too structured or mechanical.', 'Artistic expression, designing, performing, planning.', 'Artist, Composer, Writer, Actor, Designer'),
(4, 'S', 'People with the Social type care deeply about others and enjoy helping, serving or supporting others. They feel happy when they can share their knowledge, give advice or teach something to others. If you are a Social type, you tend to enjoy interpersonal interactions and often have good communication skills. You will find satisfaction in work that allows you to improve the well-being or quality of life of others.', 'Communication, empathy, teaching, training, customer service.', 'Teacher, Nurse, Counselor, Social Worker'),
(5, 'E', 'Individuals with the Enterprising type are natural leaders who love the challenge of influencing, motivating and directing others. They enjoy being involved in decision-making, selling ideas or products, and leading teams towards a common goal. If you are an Enterprising type, you tend to like jobs that are dynamic, challenging and provide opportunities to excel in the world of business or management.', 'Selling, public speaking, managing, promoting ideas.', 'Manager, Lawyer, Entrepreneur, Salesperson'),
(6, 'C', 'Conventional people like a structured, systematic, and organized work environment. They tend to enjoy administrative tasks such as managing data, keeping records, or running business procedures with high efficiency. If you are a Conventional type, you tend to feel comfortable working with clear rules, enjoy stability, and feel satisfied when completing tasks accurately and on time.', 'Detail-oriented, planning, organizing, record-keeping.', 'Accountant, Librarian, Office Clerk, Data Analyst');

-- --------------------------------------------------------

--
-- Table structure for table `test_results`
--

CREATE TABLE `test_results` (
  `test_id` int NOT NULL,
  `user_id` int NOT NULL,
  `category` varchar(255) NOT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `test_results`
--

INSERT INTO `test_results` (`test_id`, `user_id`, `category`, `timestamp`) VALUES
(1, 1, 'R,I,A', '2024-12-03 12:00:00'),
(2, 1, 'R,A,E', '2024-12-03 12:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `verified_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `provider_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `provider_type` enum('manual','google','facebook','firebase') NOT NULL DEFAULT 'manual'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `password`, `verified_at`, `created_at`, `updated_at`, `provider_id`, `provider_type`) VALUES
(1, 'testuser@example.com', '$2b$10$UHKeIDuTSL4NMayv7N3a9.aEavRpleH8yLm69uf0UEF5aN1sM124a', '2024-11-18 00:21:16', '2024-11-18 00:18:35', '2024-11-18 00:21:16', NULL, 'manual'),
(2, 'satutukeveryone@gmail.com', '$2b$10$FFlUbhIqE3HkyIesLBcC5e3NZ/vjND4n8pWWUza9Lbmq6bdtDRwD.', '2024-11-18 11:47:33', '2024-11-18 11:34:37', '2024-11-18 11:47:33', NULL, 'manual'),
(3, 'user2@example.com', '$2b$10$c36.j/StB816Kc5wXCYM2.BF.ZjitUTcl0.WeQK/m6Gb00i8JtuG2', '2024-11-19 11:33:02', '2024-11-19 11:32:25', '2024-11-19 11:33:02', NULL, 'manual'),
(4, 'user3@example.com', '$2b$10$2wFQpASc8JcXUNZEFxg/7uWKt7BtdfOwIq5zRzPTGZRyI2Sng9Opy', '2024-11-19 11:42:50', '2024-11-19 11:42:26', '2024-11-19 11:42:50', NULL, 'manual'),
(5, 'user4@example.com', '$2b$10$jFyBQta4eCYeSYdn8MporeNKFfd1WdeRIhXRoeZAbY4UHXG.CYBEm', '2024-11-19 11:47:11', '2024-11-19 11:46:49', '2024-11-19 11:47:11', NULL, 'manual'),
(6, 'user5@example.com', '$2b$10$8FA81v/RFa.9eQ396glTy.aJX3o4VNUzT/ufEaQvDKvFO28gXhI62', '2024-11-19 13:14:12', '2024-11-19 13:13:47', '2024-11-19 13:14:12', NULL, 'manual'),
(7, 'user6@example.com', '$2b$10$i/gMkJS18IQkTa.gGHqvg.O.S3xTzT4K2vJIx4iinN/CnFhAlWcG2', NULL, '2024-11-20 13:51:48', '2024-11-20 13:51:48', NULL, 'manual');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blacklist`
--
ALTER TABLE `blacklist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `careers`
--
ALTER TABLE `careers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `category_careers`
--
ALTER TABLE `category_careers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `career_id` (`career_id`);

--
-- Indexes for table `otp`
--
ALTER TABLE `otp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `riasec_details`
--
ALTER TABLE `riasec_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test_results`
--
ALTER TABLE `test_results`
  ADD PRIMARY KEY (`test_id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `google_id` (`provider_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blacklist`
--
ALTER TABLE `blacklist`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `careers`
--
ALTER TABLE `careers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `category_careers`
--
ALTER TABLE `category_careers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `otp`
--
ALTER TABLE `otp`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `riasec_details`
--
ALTER TABLE `riasec_details`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `category_careers`
--
ALTER TABLE `category_careers`
  ADD CONSTRAINT `category_careers_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `category_careers_ibfk_2` FOREIGN KEY (`career_id`) REFERENCES `careers` (`id`);

--
-- Constraints for table `otp`
--
ALTER TABLE `otp`
  ADD CONSTRAINT `otp_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `test_results`
--
ALTER TABLE `test_results`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
