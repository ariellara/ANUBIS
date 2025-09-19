-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.4.3 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para zerion
CREATE DATABASE IF NOT EXISTS `zerion` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `zerion`;

-- Volcando estructura para tabla zerion.api_key_local
CREATE TABLE IF NOT EXISTS `api_key_local` (
  `id` int NOT NULL AUTO_INCREMENT,
  `api_key` varchar(128) NOT NULL,
  `activo` tinyint(1) DEFAULT '1',
  `creado_en` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla zerion.api_key_local: ~0 rows (aproximadamente)
INSERT INTO `api_key_local` (`id`, `api_key`, `activo`, `creado_en`) VALUES
	(1, '4f7d3a5c09abf0de7c84b5f0c9a1f54b3a6d9e15c2fa11e8f9c32d8c927a1d44', 1, '2025-09-19 17:37:30');

-- Volcando estructura para tabla zerion.log_eventos
CREATE TABLE IF NOT EXISTS `log_eventos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` varchar(45) NOT NULL,
  `evento` text NOT NULL,
  `modulo` varchar(100) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=289 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla zerion.log_eventos: ~95 rows (aproximadamente)
INSERT INTO `log_eventos` (`id`, `fecha`, `ip`, `evento`, `modulo`, `usuario`) VALUES
	(162, '2025-09-07 19:43:09', '0.0.0.0', 'Sincronización exitosa en cronProgramado', 'CargarDatos', 'sistema'),
	(163, '2025-09-07 19:56:14', '0.0.0.0', 'Sincronización exitosa en cronProgramado', 'CargarDatos', 'sistema'),
	(164, '2025-09-07 19:56:51', '0.0.0.0', 'Sincronización exitosa en cronProgramado', 'CargarDatos', 'sistema'),
	(165, '2025-09-07 19:57:55', '0.0.0.0', 'Sincronización exitosa en cronProgramado', 'CargarDatos:Datos desde Doscar Guardados Exitosamente.', 'sistema'),
	(166, '2025-09-07 20:16:51', '0.0.0.0', 'Sincronización exitosa en cronProgramado', 'CargarDatos:Datos desde Doscar Guardados Exitosamente.', 'sistema'),
	(167, '2025-09-07 20:16:53', '0.0.0.0', 'Sincronización exitosa en cronProgramado', 'CargarDatos:Datos desde Doscar Guardados Exitosamente.', 'sistema'),
	(168, '2025-09-07 20:17:02', '0.0.0.0', 'Sincronización exitosa en cronProgramado', 'CargarDatos:Datos desde Doscar Guardados Exitosamente.', 'sistema'),
	(169, '2025-09-08 17:43:31', '::1', 'Error al obtener los datos: Table \'zerion.articulos_doscar\' doesn\'t exist', 'Datos', 'sistema'),
	(170, '2025-09-08 19:49:39', '0.0.0.0', 'Sincronización exitosa en cronProgramado', 'CargarDatos:Datos desde Doscar Guardados Exitosamente.', 'sistema'),
	(171, '2025-09-08 21:14:10', '::1', 'Error al json_encode en propiedad \'articulos\': Malformed UTF-8 characters, possibly incorrectly encoded', 'DebugJson', 'sistema'),
	(172, '2025-09-08 21:14:10', '::1', 'Error al json_encode en propiedad \'datosEmpresa\': Malformed UTF-8 characters, possibly incorrectly encoded', 'DebugJson', 'sistema'),
	(173, '2025-09-08 21:14:10', '::1', 'Error al json_encode en propiedad \'familias\': Malformed UTF-8 characters, possibly incorrectly encoded', 'DebugJson', 'sistema'),
	(174, '2025-09-08 21:14:10', '::1', 'Error al json_encode en propiedad \'formasPago\': Malformed UTF-8 characters, possibly incorrectly encoded', 'DebugJson', 'sistema'),
	(175, '2025-09-08 21:14:10', '::1', 'Error al json_encode en propiedad \'proveedores\': Malformed UTF-8 characters, possibly incorrectly encoded', 'DebugJson', 'sistema'),
	(176, '2025-09-08 21:14:39', '::1', 'Error al json_encode en propiedad \'articulos\': Malformed UTF-8 characters, possibly incorrectly encoded', 'DebugJson', 'sistema'),
	(177, '2025-09-08 21:15:27', '::1', 'Error al json_encode en propiedad \'datosEmpresa\': Malformed UTF-8 characters, possibly incorrectly encoded', 'DebugJson', 'sistema'),
	(178, '2025-09-08 21:15:27', '::1', 'Error al json_encode en propiedad \'familias\': Malformed UTF-8 characters, possibly incorrectly encoded', 'DebugJson', 'sistema'),
	(179, '2025-09-08 21:15:27', '::1', 'Error al json_encode en propiedad \'formasPago\': Malformed UTF-8 characters, possibly incorrectly encoded', 'DebugJson', 'sistema'),
	(180, '2025-09-08 21:15:27', '::1', 'Error al json_encode en propiedad \'proveedores\': Malformed UTF-8 characters, possibly incorrectly encoded', 'DebugJson', 'sistema'),
	(181, '2025-09-08 21:15:40', '::1', 'Error al json_encode en tabla \'articulos\': Malformed UTF-8 characters, possibly incorrectly encoded', 'DebugJson', 'sistema'),
	(182, '2025-09-08 21:15:40', '::1', 'Error al json_encode en tabla \'datosEmpresa\': Malformed UTF-8 characters, possibly incorrectly encoded', 'DebugJson', 'sistema'),
	(183, '2025-09-08 21:15:40', '::1', 'Error al json_encode en tabla \'familias\': Malformed UTF-8 characters, possibly incorrectly encoded', 'DebugJson', 'sistema'),
	(184, '2025-09-08 21:15:40', '::1', 'Error al json_encode en tabla \'formasPago\': Malformed UTF-8 characters, possibly incorrectly encoded', 'DebugJson', 'sistema'),
	(185, '2025-09-08 21:15:40', '::1', 'Error al json_encode en tabla \'proveedores\': Malformed UTF-8 characters, possibly incorrectly encoded', 'DebugJson', 'sistema'),
	(186, '2025-09-08 21:27:54', '0.0.0.0', 'Sincronización exitosa en cronProgramado', 'CargarDatos:Datos desde Doscar Guardados Exitosamente.', 'sistema'),
	(187, '2025-09-11 19:23:33', '::1', 'Error en la solicitud cURL: Operation timed out after 30005 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(188, '2025-09-11 19:29:28', '::1', 'Error en la respuesta del servidor: Código HTTP 401', 'EnvioDatosNube', 'sistema'),
	(189, '2025-09-11 19:30:24', '0.0.0.0', 'Error en la respuesta del servidor: Código HTTP 401', 'EnvioDatosNube', 'sistema'),
	(190, '2025-09-11 19:30:24', '0.0.0.0', 'Sincronización exitosa en cronProgramado', 'CargarDatos:Error en la respuesta del servidor: Código HTTP 401', 'sistema'),
	(191, '2025-09-11 19:31:31', '::1', 'Error en la solicitud cURL: Operation timed out after 30010 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(192, '2025-09-11 19:36:14', '::1', 'Error en la solicitud cURL: Operation timed out after 30021 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(193, '2025-09-11 19:38:50', '::1', 'Error en la solicitud cURL: Operation timed out after 30005 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(194, '2025-09-11 19:52:28', '::1', 'Guardar Datos', 'SincronizarManager', 'SYSTEM'),
	(195, '2025-09-11 19:54:53', '::1', 'Guardar Datos', 'SincronizarManager', 'SYSTEM'),
	(196, '2025-09-11 19:56:05', '::1', 'Guardar Datos', 'SincronizarManager', 'SYSTEM'),
	(197, '2025-09-11 19:59:16', '::1', 'Guardar Datos', 'SincronizarManager', 'SYSTEM'),
	(198, '2025-09-11 19:59:26', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(199, '2025-09-11 20:01:18', '::1', 'Guardar Datos', 'SincronizarManager', 'SYSTEM'),
	(200, '2025-09-11 20:01:22', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(201, '2025-09-11 20:02:04', '::1', 'Guardar Datos', 'SincronizarManager', 'SYSTEM'),
	(202, '2025-09-11 20:02:04', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(203, '2025-09-11 20:10:14', '::1', 'Guardar Datos', 'SincronizarManager', 'SYSTEM'),
	(204, '2025-09-11 20:10:14', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(205, '2025-09-11 20:11:09', '::1', 'Guardar Datos', 'SincronizarManager', 'SYSTEM'),
	(206, '2025-09-11 20:11:09', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(207, '2025-09-11 20:11:15', '::1', 'Guardar Datos', 'SincronizarManager', 'SYSTEM'),
	(208, '2025-09-11 20:11:15', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(209, '2025-09-11 20:16:20', '::1', 'Error en la respuesta del servidor: Código HTTP 401', 'EnvioDatosNube', 'sistema'),
	(210, '2025-09-11 20:18:18', '::1', 'Error en la respuesta del servidor: Código HTTP 401', 'EnvioDatosNube', 'sistema'),
	(211, '2025-09-11 20:19:21', '::1', 'Error en la respuesta del servidor: Código HTTP 401 - Acceso no autorizado', 'EnvioDatosNube', 'sistema'),
	(212, '2025-09-11 20:19:49', '::1', 'Error en la respuesta del servidor: Código HTTP 401 - Acceso no autorizado', 'EnvioDatosNube', 'sistema'),
	(213, '2025-09-11 20:20:42', '::1', 'Error en la respuesta del servidor: Código HTTP 401 - Acceso no autorizado', 'EnvioDatosNube', 'sistema'),
	(214, '2025-09-11 20:20:47', '::1', 'Error en la respuesta del servidor: Código HTTP 401 - Acceso no autorizado', 'EnvioDatosNube', 'sistema'),
	(215, '2025-09-11 20:21:28', '::1', 'Error en la respuesta del servidor: Código HTTP 401 - Acceso no autorizado', 'EnvioDatosNube', 'sistema'),
	(216, '2025-09-11 20:22:57', '::1', 'Error en la respuesta del servidor: Código HTTP 401 - Acceso no autorizado', 'EnvioDatosNube', 'sistema'),
	(217, '2025-09-11 20:24:17', '::1', 'Error en la respuesta del servidor: Código HTTP 401 - Acceso no autorizado', 'EnvioDatosNube', 'sistema'),
	(218, '2025-09-11 20:25:25', '::1', 'Error en la respuesta del servidor: Código HTTP 401 - Acceso no autorizado', 'EnvioDatosNube', 'sistema'),
	(219, '2025-09-11 20:27:16', '::1', 'Guardar Datos', 'SincronizarManager', 'SYSTEM'),
	(220, '2025-09-11 20:27:39', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(221, '2025-09-11 20:31:55', '::1', 'Guardar Datos', 'SincronizarManager', 'SYSTEM'),
	(222, '2025-09-11 20:31:55', '0.0.0.0', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(223, '2025-09-11 20:31:55', '0.0.0.0', 'Sincronización exitosa en cronProgramado', 'CargarDatos:Sincronización completada exitosamente.', 'sistema'),
	(224, '2025-09-11 20:33:43', '::1', 'Guardar Datos', 'SincronizarManager', 'SYSTEM'),
	(225, '2025-09-11 20:33:43', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(226, '2025-09-11 20:39:52', '::1', 'Guardar Datos', 'SincronizarManager', 'SYSTEM'),
	(227, '2025-09-11 20:39:52', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(228, '2025-09-16 16:45:31', '::1', 'Guardar Datos', 'SincronizarManager', 'SYSTEM'),
	(229, '2025-09-16 16:45:38', '::1', 'Error en la solicitud cURL: Operation timed out after 30005 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(230, '2025-09-16 17:04:30', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(231, '2025-09-16 17:07:03', '::1', 'Error en la solicitud cURL: Operation timed out after 30007 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(232, '2025-09-16 17:21:02', '::1', 'Error en la solicitud cURL: Operation timed out after 30006 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(233, '2025-09-16 17:24:53', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(234, '2025-09-16 18:03:01', '::1', 'Error en la solicitud cURL: Operation timed out after 30006 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(235, '2025-09-16 18:10:35', '::1', 'Error en la solicitud cURL: Operation timed out after 30013 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(236, '2025-09-16 18:38:19', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(237, '2025-09-16 18:39:03', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(238, '2025-09-16 18:40:18', '::1', 'Error en la solicitud cURL: Operation timed out after 30002 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(239, '2025-09-16 18:41:06', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(240, '2025-09-16 18:41:41', '::1', 'Error en la solicitud cURL: Operation timed out after 30002 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(241, '2025-09-16 18:51:54', '::1', 'Error en la solicitud cURL: Operation timed out after 30012 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(242, '2025-09-16 18:57:06', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(243, '2025-09-16 18:58:08', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(244, '2025-09-16 19:15:54', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(245, '2025-09-16 19:16:54', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(246, '2025-09-16 19:30:15', '0.0.0.0', 'Sincronización exitosa en cronProgramado', 'CargarDatos:Error al decodificar la respuesta JSON', 'sistema'),
	(247, '2025-09-16 19:35:17', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(248, '2025-09-16 19:36:13', '::1', 'Error en la solicitud cURL: Operation timed out after 30010 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(249, '2025-09-16 19:37:17', '::1', 'Error en la solicitud cURL: Operation timed out after 30015 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(250, '2025-09-16 19:38:26', '::1', 'Error en la solicitud cURL: Operation timed out after 30013 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(251, '2025-09-16 19:43:05', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(252, '2025-09-16 19:43:45', '::1', 'Error en la solicitud cURL: Operation timed out after 30001 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(253, '2025-09-16 19:47:32', '::1', 'Error en la solicitud cURL: Operation timed out after 30006 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(254, '2025-09-16 19:54:00', '::1', 'Error en la solicitud cURL: Operation timed out after 30013 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(255, '2025-09-16 19:54:32', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(256, '2025-09-16 19:55:27', '::1', 'Error en la solicitud cURL: Operation timed out after 30005 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(257, '2025-09-16 20:05:41', '::1', 'Error en la solicitud cURL: Operation timed out after 30005 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(258, '2025-09-16 20:12:08', '::1', 'Error en la solicitud cURL: Operation timed out after 30002 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(259, '2025-09-16 20:15:53', '::1', 'Error en la solicitud cURL: Operation timed out after 30001 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(260, '2025-09-16 20:16:29', '::1', 'Error en la solicitud cURL: Operation timed out after 30014 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(261, '2025-09-16 20:21:57', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(262, '2025-09-16 20:22:57', '::1', 'Error en la solicitud cURL: Operation timed out after 30004 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(263, '2025-09-16 20:23:32', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(264, '2025-09-16 20:24:36', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(265, '2025-09-16 20:24:46', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(266, '2025-09-16 20:24:52', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(267, '2025-09-16 20:27:41', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(268, '2025-09-19 16:21:43', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(269, '2025-09-19 16:22:23', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(270, '2025-09-19 16:22:58', '::1', 'Error en la solicitud cURL: Operation timed out after 30006 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(271, '2025-09-19 16:34:57', '::1', 'Error en la solicitud cURL: Operation timed out after 30009 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(272, '2025-09-19 16:39:04', '::1', 'Error en la solicitud cURL: Operation timed out after 30002 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(273, '2025-09-19 16:41:50', '::1', 'Error en la solicitud cURL: Operation timed out after 30007 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(274, '2025-09-19 16:43:36', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(275, '2025-09-19 16:44:10', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(276, '2025-09-19 16:50:01', '::1', 'Error en la solicitud cURL: Operation timed out after 30013 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(277, '2025-09-19 16:55:38', '::1', 'Error en la solicitud cURL: Operation timed out after 30003 milliseconds with 10217 bytes received', 'EnvioDatosNube', 'sistema'),
	(278, '2025-09-19 16:56:23', '::1', 'Error en la solicitud cURL: Operation timed out after 30012 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(279, '2025-09-19 16:57:45', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(280, '2025-09-19 16:59:28', '::1', 'Error en la solicitud cURL: Operation timed out after 30014 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(281, '2025-09-19 17:00:25', '::1', 'Error en la solicitud cURL: Operation timed out after 30001 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(282, '2025-09-19 17:03:12', '::1', 'Error en la solicitud cURL: Operation timed out after 30006 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(283, '2025-09-19 17:05:11', '::1', 'Error en la solicitud cURL: Operation timed out after 30012 milliseconds with 0 bytes received', 'EnvioDatosNube', 'sistema'),
	(284, '2025-09-19 17:07:33', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(285, '2025-09-19 17:44:24', '::1', 'Excepción al enviar datos a la nube: Unknown column \'apy_key\' in \'field list\'', 'EnvioDatosNube', 'sistema'),
	(286, '2025-09-19 17:46:00', '::1', 'Error en la respuesta del servidor: Código HTTP 401 - Acceso no autorizado', 'EnvioDatosNube', 'sistema'),
	(287, '2025-09-19 17:46:20', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema'),
	(288, '2025-09-19 18:02:09', '::1', 'Datos enviados correctamente a la nube.', 'EnvioDatosNube', 'sistema');

-- Volcando estructura para tabla zerion.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `correo` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `pass` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `rol` int NOT NULL,
  `estado` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla zerion.usuarios: ~2 rows (aproximadamente)
INSERT INTO `usuarios` (`id`, `nombre`, `correo`, `pass`, `rol`, `estado`) VALUES
	(4, 'ariel', 'arieloxi@gmail.com', '4310c803740f4622bf66e2e222a5439c', 1, 1),
	(5, 'Administrador', 'admin@gmail.es', 'e10adc3949ba59abbe56e057f20f883e', 1, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
