DROP TABLE IF EXISTS chat;

CREATE TABLE chat (
      id SERIAL PRIMARY KEY,
      sender_id INT NOT NULL REFERENCES users(id),
      message_text VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

INSERT INTO chat (sender_id, message_text) VALUES (
    '23',
    'Welcome to Spiced and the Future!'
);

INSERT INTO chat (sender_id, message_text) VALUES (
    '28',
    'Hey, what are you talking about?'
);

INSERT INTO chat (sender_id, message_text) VALUES (
    '32',
    'I love Chilis!'
);