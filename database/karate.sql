CREATE DATABASE karate;
USE karate;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  nascimento DATE,
  endereco VARCHAR(150),
  rg VARCHAR(20),
  cpf VARCHAR(20),
  mae VARCHAR(100),
  pai VARCHAR(100),
  telefone VARCHAR(20),
  whatsapp VARCHAR(20),
  instagram VARCHAR(100),
  facebook VARCHAR(100),
  tipo ENUM('Aluno', 'Professor'),
  graduacao VARCHAR(50),
  email VARCHAR(100) UNIQUE,
  senha VARCHAR(100),
  foto VARCHAR(100)
);

CREATE TABLE certificados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  aluno_id INT,
  arquivo VARCHAR(100),
  data_envio DATE,
  FOREIGN KEY (aluno_id) REFERENCES usuarios(id)
);