-- Таблицы

CREATE TABLE books (
    id                  uuid    NOT NULL DEFAULT gen_random_uuid(),
    author_id           uuid    NOT NULL,
    publisher_id        uuid    NOT NULL,
    title               varchar NOT NULL,
    cover               varchar NOT NULL,
    year_of_publishing  integer NOT NULL,
    CHECK (
        year_of_publishing > 1986
    ),

    PRIMARY KEY (id)
);

CREATE TABLE authors (
    id                  uuid    NOT NULL DEFAULT gen_random_uuid(),
    country_id          uuid    NOT NULL,
    name                varchar NOT NULL,
    surname             varchar NOT NULL,
    father_name         varchar,

    PRIMARY KEY (id)
);

CREATE TABLE countries (
    id                  uuid    NOT NULL DEFAULT gen_random_uuid(),
    title               varchar NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE groups (
    id                  uuid    NOT NULL DEFAULT gen_random_uuid(),
    number              smallint  NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE users (
    id                  uuid    NOT NULL DEFAULT gen_random_uuid(),
    name                varchar NOT NULL,
    surname             varchar NOT NULL,
    father_name         varchar,
    login               varchar NOT NULL,
    password            varchar NOT NULL,
    role                varchar NOT NULL,
    CHECK (
        role IN ('admin', 'student')
    ),

    PRIMARY KEY (id)
);

CREATE TABLE publishers (
    id                  uuid    NOT NULL DEFAULT gen_random_uuid(),
    name                varchar NOT NULL,

    PRIMARY KEY (id)
);

-- АССОЦИАЦИИ

CREATE TABLE users_and_groups (
    id                  uuid    NOT NULL DEFAULT gen_random_uuid(),
    user_id             uuid    NOT NULL,
    group_id            uuid    NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE users_and_books (
    id                  uuid    NOT NULL DEFAULT gen_random_uuid(),
    user_id             uuid    NOT NULL,
    book_id             uuid    NOT NULL,
    date_of_gatting     date    NOT NULL,
    date_of_ending      date    NOT NULL,
    date_of_returning   date    NOT NULL,
    status              varchar NOT NULL,
    CHECK (
        status IN ('reading', 'returned')
    ),

    PRIMARY KEY (id)
);

-- Добавление индексов и ссылок

ALTER TABLE authors
    ADD FOREIGN KEY (country_id)
        REFERENCES  countries (id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE;

ALTER TABLE books
    ADD FOREIGN KEY (author_id)
        REFERENCES authors (id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    ADD FOREIGN KEY (publisher_id)
        REFERENCES publishers (id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE;

ALTER TABLE users_and_books
    ADD FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    ADD FOREIGN KEY (book_id)
        REFERENCES books (id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE;

ALTER TABLE users_and_groups
    ADD FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE;
    ADD FOREIGN KEY (group_id)
        REFERENCES groups (id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE;