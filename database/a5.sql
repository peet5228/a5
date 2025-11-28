-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Tempo de geração: 28-Nov-2025 às 17:17
-- Versão do servidor: 8.0.44
-- versão do PHP: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de dados: `a5`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_eva`
--

CREATE TABLE `tb_eva` (
  `id_eva` int NOT NULL,
  `id_member` int NOT NULL,
  `id_sys` int NOT NULL,
  `day_eva` date NOT NULL,
  `total_eva` double(10,2) NOT NULL,
  `total_commit` double(10,2) NOT NULL,
  `status_eva` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_indiacate`
--

CREATE TABLE `tb_indiacate` (
  `id_indicate` int NOT NULL,
  `id_topic` int NOT NULL,
  `name_indicate` varchar(100) NOT NULL,
  `detail_indicate` text NOT NULL,
  `point_indicate` int NOT NULL,
  `check_indicate` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_member`
--

CREATE TABLE `tb_member` (
  `id_member` int NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('ฝ่ายบุคลากร','กรรมการประเมิน','ผู้รับการประเมินผล') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `tb_member`
--

INSERT INTO `tb_member` (`id_member`, `first_name`, `last_name`, `email`, `username`, `password`, `role`) VALUES
(1, 'Admin', '1', 'admin@gmail.com', 'aaaa', 'aaaaaa', 'ฝ่ายบุคลากร');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_system`
--

CREATE TABLE `tb_system` (
  `id_sys` int NOT NULL,
  `day_open` date NOT NULL,
  `day_out` date NOT NULL,
  `round_sys` varchar(4) NOT NULL,
  `year_sys` varchar(4) NOT NULL,
  `status_sys` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_topic`
--

CREATE TABLE `tb_topic` (
  `id_topic` int NOT NULL,
  `name_topic` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `tb_eva`
--
ALTER TABLE `tb_eva`
  ADD PRIMARY KEY (`id_eva`);

--
-- Índices para tabela `tb_member`
--
ALTER TABLE `tb_member`
  ADD PRIMARY KEY (`id_member`);

--
-- Índices para tabela `tb_system`
--
ALTER TABLE `tb_system`
  ADD PRIMARY KEY (`id_sys`);

--
-- Índices para tabela `tb_topic`
--
ALTER TABLE `tb_topic`
  ADD PRIMARY KEY (`id_topic`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tb_eva`
--
ALTER TABLE `tb_eva`
  MODIFY `id_eva` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_member`
--
ALTER TABLE `tb_member`
  MODIFY `id_member` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `tb_system`
--
ALTER TABLE `tb_system`
  MODIFY `id_sys` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_topic`
--
ALTER TABLE `tb_topic`
  MODIFY `id_topic` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
