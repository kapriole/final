DROP TABLE IF EXISTS friendships;

CREATE TABLE friendships (
      id SERIAL PRIMARY KEY,
      sender_id INT NOT NULL REFERENCES users(id),
      receiver_id INT NOT NULL REFERENCES users(id),
      accepted BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );


INSERT INTO friendships (sender_id, receiver_id, accepted, created_at) VALUES (
    '24',
    '29',
    'true',
    'today'
);

INSERT INTO friendships (sender_id, receiver_id, accepted, created_at) VALUES (
    '29',
    '24',
    'true',
    'today'
);

INSERT INTO friendships (sender_id, receiver_id, accepted, created_at) VALUES (
    '30',
    '29',
    'false',
    'today'
);