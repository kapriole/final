DROP TABLE IF EXISTS users;

CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      first VARCHAR(255) NOT NULL,
      last VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      class VARCHAR(255) NOT NULL,
      pass VARCHAR(255) NOT NULL,
      bio VARCHAR(255),
      img_url VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

 