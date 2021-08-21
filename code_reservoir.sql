-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 20, 2021 at 03:11 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `code_reservoir`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `blog_img` text,
  `content` text NOT NULL,
  `owner_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `article_comments`
--

CREATE TABLE `article_comments` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `owner_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `article_comment_likes`
--

CREATE TABLE `article_comment_likes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `article_comment_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `article_likes`
--

CREATE TABLE `article_likes` (
  `id` int(11) NOT NULL,
  `user_id` text NOT NULL,
  `article_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `my_id` int(11) NOT NULL,
  `chat_text` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `devices`
--

CREATE TABLE `devices` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `n_token` text NOT NULL,
  `active` text NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `devices`
--

INSERT INTO `devices` (`id`, `user_id`, `n_token`, `active`, `created_at`) VALUES
(3, 8, '{\"type\":\"expo\",\"data\":\"ExponentPushToken[JIBnXOPjWYaGv4ae9mwXvJ]\"}', '', '0000-00-00 00:00:00'),
(4, 11, '{\"type\":\"expo\",\"data\":\"ExponentPushToken[80SJktDQRkL2I4Pwgaw83s]\"}', '', '0000-00-00 00:00:00'),
(5, 16, '{\"type\":\"expo\",\"data\":\"ExponentPushToken[0X_dOaFB4e1QhVUKjk5s2V]\"}', '', '0000-00-00 00:00:00'),
(6, 30, '{\"type\":\"expo\",\"data\":\"ExponentPushToken[wKPpAmJydjW5bc07kNxRr0]\"}', '', '0000-00-00 00:00:00'),
(7, 31, '{\"type\":\"expo\",\"data\":\"ExponentPushToken[B2uZRRP8hKfNKbdBAPWkhx]\"}', '', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `Events`
--

CREATE TABLE `Events` (
  `event_id` int(11) NOT NULL,
  `title` text NOT NULL,
  `event_media` text NOT NULL,
  `description` text NOT NULL,
  `is_video` varchar(70) NOT NULL,
  `poster_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `inputs`
--

CREATE TABLE `inputs` (
  `id` int(11) NOT NULL,
  `input` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receipient_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `message_file` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `receipient_id`, `message`, `message_file`, `created_at`) VALUES
(1, 11, 14, 'Hi', '', '2021-07-27 00:02:20');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `p_id` int(11) NOT NULL,
  `post_caption` text CHARACTER SET utf8mb4,
  `post_media` text,
  `is_video` varchar(60) DEFAULT NULL,
  `owner_id` int(11) NOT NULL,
  `youtube_url` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`p_id`, `post_caption`, `post_media`, `is_video`, `owner_id`, `youtube_url`, `created_at`) VALUES
(53, '', 'https://res.cloudinary.com/dv5qiaugw/image/upload/v1629401203/t4fubjkdfhhwcjd62s6x.jpg', 'false', 55, '', '2021-08-19 19:26:45');

-- --------------------------------------------------------

--
-- Table structure for table `post_comments`
--

CREATE TABLE `post_comments` (
  `id` int(11) NOT NULL,
  `text` text CHARACTER SET utf8mb4 NOT NULL,
  `comment_media` text NOT NULL,
  `C_post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `post_comment_likes`
--

CREATE TABLE `post_comment_likes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_comment_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `post_likes`
--

CREATE TABLE `post_likes` (
  `id` int(11) NOT NULL,
  `post_liker` int(11) NOT NULL,
  `L_post_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `post_likes`
--

INSERT INTO `post_likes` (`id`, `post_liker`, `L_post_id`, `created_at`) VALUES
(368, 52, 22, '2021-08-14 18:05:02'),
(369, 52, 23, '2021-08-14 18:11:20'),
(381, 52, 25, '2021-08-15 00:14:47'),
(385, 54, 25, '2021-08-15 00:22:29'),
(386, 54, 22, '2021-08-15 00:23:42'),
(394, 54, 27, '2021-08-15 02:18:30'),
(413, 54, 23, '2021-08-15 04:17:29'),
(419, 52, 16, '2021-08-15 16:29:19'),
(429, 52, 18, '2021-08-15 21:47:14'),
(434, 52, 17, '2021-08-15 21:58:36'),
(437, 52, 21, '2021-08-15 23:25:38'),
(441, 52, 24, '2021-08-15 23:29:23'),
(447, 52, 20, '2021-08-16 00:24:29'),
(448, 52, 19, '2021-08-16 00:26:17'),
(449, 52, 27, '2021-08-16 00:33:16'),
(485, 52, 31, '2021-08-17 21:39:08'),
(486, 52, 32, '2021-08-17 22:52:31'),
(490, 52, 33, '2021-08-17 23:16:03'),
(524, 52, 34, '2021-08-18 13:34:15'),
(527, 52, 35, '2021-08-18 15:23:37'),
(610, 52, 30, '2021-08-19 01:47:22'),
(613, 52, 40, '2021-08-19 01:56:42'),
(615, 52, 41, '2021-08-19 02:05:06'),
(616, 52, 42, '2021-08-19 03:08:11'),
(617, 52, 37, '2021-08-19 03:30:12'),
(625, 52, 28, '2021-08-19 08:11:19'),
(626, 52, 29, '2021-08-19 08:11:21'),
(627, 52, 44, '2021-08-19 08:18:49'),
(629, 52, 47, '2021-08-19 08:44:15'),
(633, 52, 48, '2021-08-19 09:04:32'),
(634, 52, 46, '2021-08-19 09:04:36'),
(635, 54, 46, '2021-08-19 15:08:33'),
(636, 54, 44, '2021-08-19 15:08:35'),
(638, 54, 43, '2021-08-19 15:08:39'),
(640, 54, 37, '2021-08-19 15:11:07'),
(641, 54, 26, '2021-08-19 15:12:02'),
(643, 54, 36, '2021-08-19 15:18:45'),
(645, 54, 51, '2021-08-19 18:42:06'),
(646, 55, 53, '2021-08-19 19:27:49');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` float(10,2) NOT NULL,
  `product_img` text NOT NULL,
  `description` text,
  `phone_number` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `trial`
--

CREATE TABLE `trial` (
  `id` int(11) NOT NULL,
  `caption` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `full_name` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `user_img` text NOT NULL,
  `coverphoto` text NOT NULL,
  `bio` text CHARACTER SET utf8mb4 NOT NULL,
  `website` text,
  `active` int(1) NOT NULL DEFAULT '0',
  `hash` varchar(100) NOT NULL,
  `date_joined` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `username`, `email`, `password`, `user_img`, `coverphoto`, `bio`, `website`, `active`, `hash`, `date_joined`) VALUES
(55, 'Allen Jones', '', 'aljay3334@gmail.com', '$2a$12$7w8FNKfYWLfbzWh225OAi.8TDiJwQR.H2qlqQ/xOG8yxTNuFx648q', 'https://res.cloudinary.com/dv5qiaugw/image/upload/v1629400835/edluqnqnxxzdsl6fgvaf.jpg', 'https://res.cloudinary.com/dv5qiaugw/image/upload/v1629400849/sorlok2jfroxfwyyz0pt.jpg', 'My bio', NULL, 0, '', '2021-08-19 19:25:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `article_comments`
--
ALTER TABLE `article_comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `article_comment_likes`
--
ALTER TABLE `article_comment_likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `article_likes`
--
ALTER TABLE `article_likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `article_id` (`article_id`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Events`
--
ALTER TABLE `Events`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `inputs`
--
ALTER TABLE `inputs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`p_id`),
  ADD KEY `posts_ibfk_1` (`owner_id`);

--
-- Indexes for table `post_comments`
--
ALTER TABLE `post_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_comments_ibfk_1` (`C_post_id`),
  ADD KEY `post_comments_ibfk_2` (`user_id`);

--
-- Indexes for table `post_comment_likes`
--
ALTER TABLE `post_comment_likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_comment_id` (`post_comment_id`);

--
-- Indexes for table `post_likes`
--
ALTER TABLE `post_likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_likes_ibfk_1` (`post_liker`),
  ADD KEY `post_likes_ibfk_2` (`L_post_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_ibfk_1` (`user_id`);

--
-- Indexes for table `trial`
--
ALTER TABLE `trial`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `article_comments`
--
ALTER TABLE `article_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `article_comment_likes`
--
ALTER TABLE `article_comment_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `article_likes`
--
ALTER TABLE `article_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `devices`
--
ALTER TABLE `devices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Events`
--
ALTER TABLE `Events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inputs`
--
ALTER TABLE `inputs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `post_comments`
--
ALTER TABLE `post_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_comment_likes`
--
ALTER TABLE `post_comment_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_likes`
--
ALTER TABLE `post_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=647;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `trial`
--
ALTER TABLE `trial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `article_comment_likes`
--
ALTER TABLE `article_comment_likes`
  ADD CONSTRAINT `article_comment_likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `article_comments` (`id`);

--
-- Constraints for table `article_likes`
--
ALTER TABLE `article_likes`
  ADD CONSTRAINT `article_likes_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `post_comments`
--
ALTER TABLE `post_comments`
  ADD CONSTRAINT `post_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `post_comment_likes`
--
ALTER TABLE `post_comment_likes`
  ADD CONSTRAINT `post_comment_likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `post_comment_likes_ibfk_2` FOREIGN KEY (`post_comment_id`) REFERENCES `post_comments` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
