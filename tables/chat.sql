DROP TABLE IF EXISTS chat;

CREATE TABLE chat (
      id SERIAL PRIMARY KEY,
      message_id INT NOT NULL REFERENCES chat(id),
      sender_id INT NOT NULL REFERENCES users(id),
      message_text VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

INSERT INTO chat (message_id, sender_id, message_text, created_at) VALUES (
    '1',
    '23',
    'Welcome to Spiced and the Future!',
    'today'
);

INSERT INTO chat (message_id, sender_id, message_text, created_at) VALUES (
    '2',
    '28',
    'Hey, what are you talking about?',
    'today'
);

INSERT INTO chat (message_id, sender_id, message_text, created_at) VALUES (
    '3',
    '32',
    'I love Chilis!',
    'today'
);