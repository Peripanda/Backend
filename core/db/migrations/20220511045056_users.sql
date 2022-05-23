-- migrate:up
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR ( 50 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	name VARCHAR ( 255 ),
	lastname VARCHAR ( 255 ),
	balance INTEGER DEFAULT 0,
	birth_date DATE
);


-- migrate:down
DROP TABLE users;
