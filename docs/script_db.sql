-- Base de datos biblioteca version easy
DROP DATABASE IF EXISTS biblioteca_easy;
CREATE DATABASE biblioteca_easy;
USE biblioteca_easy;

-- Tabla usuarios
DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios (
  id_usuario int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre varchar(100) NOT NULL,
  identificacion varchar(50) NOT NULL UNIQUE,
  correo varchar(100) DEFAULT NULL,
  telefono varchar(30) DEFAULT NULL,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp
) ;

-- Tabla libros
DROP TABLE IF EXISTS libros;
CREATE TABLE libros (
  id_libro int NOT NULL AUTO_INCREMENT  PRIMARY KEY,
  titulo varchar(255) NOT NULL,
  isbn varchar(50) NOT NULL  UNIQUE KEY,
  anio_publicacion year DEFAULT NULL,
  autor varchar(100) DEFAULT NULL,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp
);

-- Tabla prestamos
DROP TABLE IF EXISTS prestamos;
CREATE TABLE prestamos (
  id_prestamo int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_usuario int,
  id_libro int,
  fecha_prestamo date NOT NULL,
  fecha_devolucion date DEFAULT NULL,
  estado enum('Entregado','Retrasado','Activo') DEFAULT NULL,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp,
  
  FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario) on delete set null on update cascade,
  FOREIGN KEY (id_libro) REFERENCES libros (id_libro) on delete set null on update cascade
);





