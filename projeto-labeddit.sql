-- Active: 1696115870643@@127.0.0.1@3306
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER,
    dislikes INTEGER,
    created_at TEXT NOT NULL,
    updated_at TEXT,
    amount_comments INTEGER,
    FOREIGN KEY (creator_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE if NOT EXISTS likes_dislikes(
    user_id TEXT,
    post_id TEXT,
    like INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id) 
    ON DELETE CASCADE
    on UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER,
    dislikes INTEGER,
    created_at TEXT NOT NULL,
    updated_at TEXT,
    FOREIGN KEY (creator_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    FOREIGN KEY (post_id) REFERENCES posts (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE if NOT EXISTS comments_amount(
    user_id TEXT,
    post_id TEXT,
    amount INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id) 
    ON DELETE CASCADE
    on UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);