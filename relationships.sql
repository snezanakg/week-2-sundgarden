 -- Clean up practice tables so this file can be run again

DROP TABLE IF EXISTS student_courses;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS users; 

-- Skill 1: Relationships

-- One-to-one relationship

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id),
    bio TEXT
);


-- Add example users
INSERT INTO users (name)
VALUES
    ('Alice'),
    ('Luca');

-- Add one profile for each user
INSERT INTO profiles (user_id, bio)
VALUES
    (1, 'Alice profile'),
    (2, 'Luca profile');

-- Show the one-to-one relationship
SELECT users.name, profiles.bio
FROM users
JOIN profiles
ON users.id = profiles.user_id;


-- One-to-many relationship

CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    author_id INTEGER REFERENCES authors(id)
);

-- Add example authors
INSERT INTO authors (name)
VALUES
    ('Anna'),
    ('Mark');

-- One author can have several books
INSERT INTO books (title, author_id)
VALUES
    ('Book One', 1),
    ('Book Two', 1),
    ('Book Three', 2);

-- Show the one-to-many relationship
SELECT authors.name, books.title
FROM authors
JOIN books
ON authors.id = books.author_id;



-- Many-to-many relationship

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL
);

CREATE TABLE student_courses (
    student_id INTEGER REFERENCES students(id),
    course_id INTEGER REFERENCES courses(id),
    PRIMARY KEY (student_id, course_id)
);

-- Add example students
INSERT INTO students (name)
VALUES
    ('Alice'),
    ('Luca');

-- Add example courses
INSERT INTO courses (title)
VALUES
    ('SQL'),
    ('JavaScript');

-- Connect students and courses
INSERT INTO student_courses (student_id, course_id)
VALUES
    (1, 1),
    (1, 2),
    (2, 1);

-- Show the many-to-many relationship
SELECT students.name, courses.title
FROM student_courses
JOIN students
ON student_courses.student_id = students.id
JOIN courses
ON student_courses.course_id = courses.id;
-- Trying to insert a book with an author_id that does not exist
-- causes a foreign key constraint error because the author must exist first.
-- Trying to add the same student to the same course twice
-- causes a duplicate key error because
-- (student_id, course_id) is the composite primary key.