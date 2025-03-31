CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS book (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    note TEXT NULL,
    rating INTEGER CHECK (note >= 0 AND note <= 5) NULL,
    cover TEXT NULL,
    published_date DATE NOT NULL,
    last_modification_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES "user"(id) ON DELETE SET NULL
);
