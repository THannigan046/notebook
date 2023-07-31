
   
-- CREATE DATABASE "first-look"


-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "access_level" INT DEFAULT 0
);

CREATE TABLE "pets" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80) NOT NULL,
    "user_id" INT REFERENCES "user"
);

CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY, 
	"name" VARCHAR(80) NOT NULL,
	"days_per_week" INTEGER(30), 
	"monday" BOOLEAN, 
    "tuesday" BOOLEAN,
    "wednesday" BOOLEAN,
    "thursday" BOOLEAN,
    "friday" BOOLEAN,
    "saturday" BOOLEAN,
    "sunday" BOOLEAN, 
    "percent_complete" INTEGER(255),
    "week_id" INT REFERENCES "weeks"
);

CREATE TABLE "weeks" (
    "id" SERIAL PRIMARY KEY, 
    "date_started" DATE,
    "date_completed" DATE
    "month_id" INT REFERENCES "months"
);

CREATE TABLE "months" (
    "id" SERIAL PRIMARY KEY, 
    "month" VARCHAR(80)
    "user_id" INT REFERENCES "user"
); 

ALTER TABLE "tasks" ADD COLUMN "week_id" INT REFERENCES "weeks".id;

ALTER TABLE "weeks" ADD COLUMN "month_id" INT REFERENCES "months".id;

ALTER TABLE "months" ADD COLUMN "user_id" INT REFERENCES "user".id;