-- phpMyAdmin SQL Dump
-- version 4.2.0
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-10-2014 a las 00:15:20
-- Versión del servidor: 5.6.17
-- Versión de PHP: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `expofiss`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `histo_pre`
--

CREATE TABLE IF NOT EXISTS `histo_pre` (
  `his_id` int(11) NOT NULL,
  `pre_id` int(11) NOT NULL,
  `histo_fec` datetime NOT NULL,
  `histo_est` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locales`
--

CREATE TABLE IF NOT EXISTS `locales` (
`loc_id` int(11) NOT NULL,
  `loc_pabe` int(11) NOT NULL,
  `loc_num` int(11) NOT NULL,
  `loc_des` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preventaweb`
--

CREATE TABLE IF NOT EXISTS `preventaweb` (
`pre_id` int(11) NOT NULL,
  `pre_emp` text NOT NULL,
  `pre_con` text NOT NULL,
  `pre_tel` varchar(12) NOT NULL,
  `pre_ema` text NOT NULL,
  `pre_tip` int(11) NOT NULL,
  `pre_ruta` int(11) NOT NULL COMMENT '1 - Google . 2 - Facebook , 3 Directo , 4 Sistema',
  `pre_rutaid` int(11) NOT NULL,
  `pre_est` int(11) NOT NULL,
  `pre_int` text NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=23 ;

--
-- Volcado de datos para la tabla `preventaweb`
--

INSERT INTO `preventaweb` (`pre_id`, `pre_emp`, `pre_con`, `pre_tel`, `pre_ema`, `pre_tip`, `pre_ruta`, `pre_rutaid`, `pre_est`, `pre_int`) VALUES
(12, 'miguel', 'gomez', '04122038487', 'inventr@gmail.com', 1, 1, 1, 1, ''),
(13, 'miguel', 'gomez', '04122038487', 'inventr@gmail.com', 1, 1, 1, 1, ''),
(14, 'asdasd', '', '', '', 0, 0, 0, 0, ''),
(15, 'asdasd', 'asdasd', '04122037487', 'alexmiguel@hotmail.com', 2, 0, 0, 0, ''),
(16, 'asdasd', 'asdasd', '04122037487', 'alexmiguel@hotmail.com', 2, 0, 0, 0, ''),
(17, 'asdasd', 'asdasd', '04122037487', 'alexmiguel@hotmail.com', 2, 0, 0, 0, ''),
(18, 'asdasd', 'asdasd', '04122037487', 'alexmiguel@hotmail.com', 2, 4, 4, 0, ''),
(19, 'carlos coste', 'Carlos Coste', '04122037487', 'inventr@gmail.com', 2, 0, 0, 0, ''),
(20, 'asdasd', 'asdasd', '12312312323', 'inventr@gmail.com', 1, 0, 0, 0, ''),
(21, 'asdasd', 'asdasd', '21231231231', 'inventr@gmail.com', 2, 0, 0, 0, ''),
(22, 'gomez', 'miguel', '04122037487', 'inventr@gmail.com', 3, 1, 12928389, 0, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarea_pre`
--

CREATE TABLE IF NOT EXISTS `tarea_pre` (
`tar_id` int(11) NOT NULL,
  `pre_id` int(11) NOT NULL,
  `tar_fechcre` datetime NOT NULL COMMENT 'creacon',
  `tar_fechrea` datetime NOT NULL COMMENT 'realizar',
  `tar_tip` int(11) NOT NULL COMMENT 'Tipo tarea',
  `tar_des` text NOT NULL COMMENT 'descripcion',
  `tar_est` int(11) NOT NULL COMMENT 'Estado',
  `tar_not` text NOT NULL COMMENT 'nota'
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Volcado de datos para la tabla `tarea_pre`
--

INSERT INTO `tarea_pre` (`tar_id`, `pre_id`, `tar_fechcre`, `tar_fechrea`, `tar_tip`, `tar_des`, `tar_est`, `tar_not`) VALUES
(10, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 'asdasd', 1, ''),
(11, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, '', 2, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_empresa`
--

CREATE TABLE IF NOT EXISTS `tipo_empresa` (
`tipo_id` int(11) NOT NULL,
  `tipo_des` varchar(50) NOT NULL,
  `tipo_cla` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `tipo_empresa`
--

INSERT INTO `tipo_empresa` (`tipo_id`, `tipo_des`, `tipo_cla`) VALUES
(1, 'Calzado', 1),
(2, 'Licores', 1),
(3, 'Ropa Infantil', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `locales`
--
ALTER TABLE `locales`
 ADD PRIMARY KEY (`loc_id`);

--
-- Indices de la tabla `preventaweb`
--
ALTER TABLE `preventaweb`
 ADD PRIMARY KEY (`pre_id`);

--
-- Indices de la tabla `tarea_pre`
--
ALTER TABLE `tarea_pre`
 ADD PRIMARY KEY (`tar_id`);

--
-- Indices de la tabla `tipo_empresa`
--
ALTER TABLE `tipo_empresa`
 ADD PRIMARY KEY (`tipo_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `locales`
--
ALTER TABLE `locales`
MODIFY `loc_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `preventaweb`
--
ALTER TABLE `preventaweb`
MODIFY `pre_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT de la tabla `tarea_pre`
--
ALTER TABLE `tarea_pre`
MODIFY `tar_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT de la tabla `tipo_empresa`
--
ALTER TABLE `tipo_empresa`
MODIFY `tipo_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
