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
    cover TEXT NULL,
    published_date DATE NOT NULL,
    last_modification_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP,
    created_by INTEGER,
    CONSTRAINT fk_user FOREIGN KEY(created_by) REFERENCES "user"(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS "role" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS book_rating (
    book_id INTEGER,
    user_id INTEGER,
    rating INTEGER,
    CONSTRAINT fk_book FOREIGN KEY(book_id) REFERENCES book(id) ON DELETE SET NULL,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES "user"(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS book_to_read (
    book_id INTEGER,
    user_id INTEGER,
    CONSTRAINT fk_book FOREIGN KEY(book_id) REFERENCES book(id) ON DELETE SET NULL,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES "user"(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS role_user (
    role_id INTEGER,
    user_id INTEGER,
    CONSTRAINT fk_role FOREIGN KEY(role_id) REFERENCES "role"(id) ON DELETE SET NULL,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES "user"(id) ON DELETE SET NULL
);
