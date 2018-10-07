CREATE TABLE instructors (
  instructor_id SERIAL PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  experience INT NOT NULL,
  website VARCHAR(50)
);

CREATE TABLE students (
  student_id SERIAL PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
         age INT NOT NULL,
     address VARCHAR(50)
);