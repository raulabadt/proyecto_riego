CREATE DATABASE riego;

-- to use database
use riego;

-- creating a new table
 CREATE TABLE IF NOT EXISTS tablariego (
  
 id INT (6) AUTO_INCREMENT PRIMARY KEY,
 propietario VARCHAR(255) NOT NULL,
 arrendatario VARCHAR(255)NOT NULL,
 iban VARCHAR(255),
 telefono VARCHAR(255),
 email VARCHAR(255),
 parcela VARCHAR(255),
 superficie VARCHAR(255),
 euros VARCHAR(255),
 uso VARCHAR(255)
);


-- to show all tables
show tables;

-- to describe table
describe tablariego;