-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 16, 2025 at 04:34 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `logicat_test_technique_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_10_15_110651_create_oauth_auth_codes_table', 2),
(5, '2025_10_15_110652_create_oauth_access_tokens_table', 2),
(6, '2025_10_15_110653_create_oauth_refresh_tokens_table', 2),
(7, '2025_10_15_110654_create_oauth_clients_table', 2),
(8, '2025_10_15_110655_create_oauth_device_codes_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` char(80) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` char(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `scopes` text DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
('05fb458fc6b459690266a035ae14cec78026570f7d33de8dabbb6df4346b3297fbb6385803aaa00e', 1, '0199e78d-b061-719a-bd14-a86b82994d19', 'token', '[]', 0, '2025-10-15 10:08:08', '2025-10-15 10:08:08', '2026-10-15 11:08:08'),
('06d871d5b1eb09b727c0a67cf1f4a717293ce01b5d626018f1a174bb77481dcf79fafbfd081701f9', 1, '0199e78d-b061-719a-bd14-a86b82994d19', 'token', '[]', 0, '2025-10-15 12:19:42', '2025-10-15 12:19:42', '2026-10-15 13:19:42'),
('16564be702d76788c45b05ab5c1f5601100e646205b794e5918f427dd9c4cbbcd52d2b8c0a0f3b79', 1, '0199e78d-b061-719a-bd14-a86b82994d19', 'token', '[]', 0, '2025-10-15 12:40:44', '2025-10-15 12:40:44', '2026-10-15 13:40:44'),
('16952943df291a6bc4b6c4e1073414bb3fba93a727279513fe2cc490d66cb05374003cb032d42ff6', 1, '0199e78d-b061-719a-bd14-a86b82994d19', 'token', '[]', 0, '2025-10-15 22:03:39', '2025-10-15 22:03:39', '2026-10-15 23:03:39'),
('24c5c0e36697e13879495248190dbec94e7a566901eb93a41f3dd447a5002846d8ba661400b8fd33', 1, '0199e78d-b061-719a-bd14-a86b82994d19', 'token', '[]', 0, '2025-10-15 12:17:22', '2025-10-15 12:17:22', '2026-10-15 13:17:22'),
('264cc3161a7dd6e968f2a0d3e4eeb85f4a9596a906858e20288d873fed58ed26b2b58a65da2550d0', 2, '0199e78d-b061-719a-bd14-a86b82994d19', 'token', '[]', 0, '2025-10-16 01:11:39', '2025-10-16 01:11:39', '2026-10-16 02:11:39'),
('272914d0dbcca7b072fc0f672187e0d8dec1ae58b91a69f4818fb64e3399621caa031d09183aeef0', 1, '0199e78d-b061-719a-bd14-a86b82994d19', 'token', '[]', 0, '2025-10-15 22:08:26', '2025-10-15 22:08:26', '2026-10-15 23:08:26'),
('3610286291d9f34200167071a6923211a7176d24d5deef6959adc660088ba587b4f4677de8863292', 1, '0199e78d-b061-719a-bd14-a86b82994d19', 'token', '[]', 0, '2025-10-15 22:05:42', '2025-10-15 22:05:42', '2026-10-15 23:05:42'),
('384e66e9c81997ae802ea5c931c5fc49a6b367b921a3a8e8cad02ec607145f252b92afe2173e3491', 1, '0199e78d-b061-719a-bd14-a86b82994d19', 'token', '[]', 0, '2025-10-15 12:40:41', '2025-10-15 12:40:41', '2026-10-15 13:40:41'),
('4742e7397dba5feffebf57e7eb0d10b2e40b93dd36c8a2a0e48f67e10f90488a27cae5b87fbd31db', 2, '0199e78d-b061-719a-bd14-a86b82994d19', 'token', '[]', 0, '2025-10-16 01:14:39', '2025-10-16 01:14:39', '2026-10-16 02:14:39'),
('5efadebfd7f0f437d01bb87ca62476759d10d4e09eea5131d3f0ce0da4c124057614a855c0b8d91d', 1, '0199e78d-b061-719a-bd14-a86b82994d19', 'token', '[]', 0, '2025-10-15 12:18:38', '2025-10-15 12:18:38', '2026-10-15 13:18:38'),
('6395e7829f3012a4db8eb567fbe5a47f7f776e099a80e6fa2dd525fc0691d16c6bc594fbf23ee0c0', 1, '0199e78d-b061-719a-bd14-a86b82994d19', 'token', '[]', 0, '2025-10-15 12:40:27', '2025-10-15 12:40:27', '2026-10-15 13:40:27'),
('6ce7b6c4fe037cc555ee587c150b245af474a8f54ae4a7d9b39ceb28032d491ba722bb8c69764371', 2, '0199e78d-b061-719a-bd14-a86b82994d19', 'token', '[]', 0, '2025-10-16 01:16:05', '2025-10-16 01:16:05', '2026-10-16 02:16:05'),
('747c76515fad2c6b3ef1760a56b7ca0d632bd5845de0f59d32a8e6bc77bd8714102c1c00a74a3e24', 1, '0199e78d-b061-719a-bd14-a86b82994d19', 'token', '[]', 0, '2025-10-15 22:40:52', '2025-10-15 22:40:52', '2026-10-15 23:40:52'),
('80492c2976ac26f7d059e2b159991daf32be3c48dbae6f7f0840ec7a1722143a35fc6bfa5a6f79c6', 1, '0199e78d-b061-719a-bd14-a86b82994d19', 'token', '[]', 0, '2025-10-15 10:08:54', '2025-10-15 10:08:54', '2026-10-15 11:08:54'),
('8d91e95c6b43d692182b3e079db14b15ef9f8ba1ff2d66c84f2e59e01e40a19cf52212fe5a7682fe', 1, '0199e78d-b061-719a-bd14-a86b82994d19', 'token', '[]', 0, '2025-10-15 10:08:04', '2025-10-15 10:08:05', '2026-10-15 11:08:04'),
('9a46b949ac3fe88e9e083541c10a7988f7085f6e022ade856dda7c3baaf07a3433a0337c62bd5c20', 1, '0199e78d-b061-719a-bd14-a86b82994d19', 'token', '[]', 0, '2025-10-15 10:08:06', '2025-10-15 10:08:06', '2026-10-15 11:08:06'),
('c55581aab4ddf9a683deb0ccfa4274848281bb4725e5a0f9594b74a1f6b70653274f291b90e18a57', 1, '0199e78d-b061-719a-bd14-a86b82994d19', 'token', '[]', 0, '2025-10-15 10:45:15', '2025-10-15 10:45:15', '2026-10-15 11:45:15'),
('d35c9cb6386ccd8fbd10df4ea6c2cead9f82a0f02d2dd6387aa40be027dd76e23f6e5cfa259db242', 1, '0199e78d-b061-719a-bd14-a86b82994d19', 'token', '[]', 0, '2025-10-15 10:09:58', '2025-10-15 10:09:58', '2026-10-15 11:09:58'),
('e9f7bb3bb551f9581c05ac150d5660e87b37bdc518991d39b683e1983824e4a01365f134ad3fa550', 1, '0199e78d-b061-719a-bd14-a86b82994d19', 'token', '[]', 0, '2025-10-15 22:07:28', '2025-10-15 22:07:28', '2026-10-15 23:07:28');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` char(80) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` char(36) NOT NULL,
  `scopes` text DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` char(36) NOT NULL,
  `owner_type` varchar(255) DEFAULT NULL,
  `owner_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `secret` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `redirect_uris` text NOT NULL,
  `grant_types` text NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `owner_type`, `owner_id`, `name`, `secret`, `provider`, `redirect_uris`, `grant_types`, `revoked`, `created_at`, `updated_at`) VALUES
('0199e78d-b061-719a-bd14-a86b82994d19', NULL, NULL, 'Laravel', '$2y$12$RHexgUI1LloAKGQ7CvK6uOEl6BCp6xR/WkT6k2fm/h/JKGrF/WL3m', 'users', '[]', '[\"personal_access\"]', 0, '2025-10-15 10:07:26', '2025-10-15 10:07:26');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_device_codes`
--

CREATE TABLE `oauth_device_codes` (
  `id` char(80) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` char(36) NOT NULL,
  `user_code` char(8) NOT NULL,
  `scopes` text NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `user_approved_at` datetime DEFAULT NULL,
  `last_polled_at` datetime DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` char(80) NOT NULL,
  `access_token_id` char(80) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('EaVkP9Dym1LgIHoirlAoIYI1ZuoYUtw1h8U5kw0t', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUm02Y3lJaHJFeURSdzBkUU5NeWVra21MNFd0c0JjM1JGOFFRaGpMRyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760579198),
('KLWclbXzNv34dJ9s4BSbcpd6nWcpJDYYXuY51rQS', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQUF3UXNPV05NS2dIQlc0SHgzRWNiU2lMQVBucDE3OHJaN0JHbms5SyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760552270),
('vEOE3nYHjNtjEyukaErqOMzLBFWGWhXfnhPakmKz', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidWFFeFRtczJqRGJ6UHV2TkJJZk1EYmpGY2ZoZDlHN3RFcnk1V3BmeiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760571450);

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `task` text NOT NULL,
  `status` enum('termine','en_cours','','') NOT NULL DEFAULT 'en_cours',
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `task`, `status`, `user_id`, `created_at`, `updated_at`) VALUES
(3, 'new test task', 'en_cours', 1, '2025-10-16 00:11:01', '2025-10-16 00:49:33'),
(4, 'test 3', 'termine', 1, '2025-10-16 00:11:28', '2025-10-16 00:49:30'),
(5, 'test tache', 'termine', 2, '2025-10-16 01:16:16', '2025-10-16 01:16:23');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'moahmed', 'mohamed@gmail.com', NULL, '$2y$12$x97tOJ/i84fds4w0TKysneuL0ZmAFkzeOjsgVURbzsarkALSPPeiu', NULL, '2025-10-15 10:45:06', '2025-10-15 10:45:06'),
(2, 'MOHAMED', 'm.oubida11@gmail.com', NULL, '$2y$12$95hVlVreA4p6ZNVbeYa71eAvSAVXFDKqnFNQs8G5HjpNAph7/wGha', NULL, '2025-10-16 01:11:28', '2025-10-16 01:11:28'),
(3, 'MOHAMED', 'oubida11@gmail.com', NULL, '$2y$12$PYdD/yvZNzwaIcPmtJzQsOIN83DozVqpQHzBo4ExEFYoqLpe2x8ma', NULL, '2025-10-16 01:15:01', '2025-10-16 01:15:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_auth_codes_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_owner_type_owner_id_index` (`owner_type`,`owner_id`);

--
-- Indexes for table `oauth_device_codes`
--
ALTER TABLE `oauth_device_codes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `oauth_device_codes_user_code_unique` (`user_code`),
  ADD KEY `oauth_device_codes_user_id_index` (`user_id`),
  ADD KEY `oauth_device_codes_client_id_index` (`client_id`);

--
-- Indexes for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_task` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `fk_user_task` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
