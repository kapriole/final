DROP TABLE IF EXISTS passcodes;

    CREATE TABLE passcodes(
          id SERIAL PRIMARY KEY,
          code VARCHAR(255),
          email VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

