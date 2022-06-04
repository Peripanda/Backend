-- migrate:up
ALTER TABLE users 
    ADD COLUMN net_investment INT DEFAULT 0;

CREATE TYPE risk_profile AS ENUM ('high', 'medium', 'low');

CREATE TABLE portfolios (
	id SERIAL PRIMARY KEY,
	risk risk_profile,
	name VARCHAR ( 255 ),
	btc_weight FLOAT,
    eth_weight FLOAT,
    usdc_weight FLOAT
);

CREATE TABLE wallets(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL
        CONSTRAINT wallet_users_id_fk
            REFERENCES users
            ON UPDATE cascade ON DELETE CASCADE,
    wallet_type risk_profile,
    btc_quantity FLOAT DEFAULT 0,
    eth_quantity FLOAT DEFAULT 0,
    usdc_quantity FLOAT DEFAULT 0
);

CREATE TABLE assets(
    ticker VARCHAR ( 50 ) PRIMARY KEY,
    name VARCHAR ( 255 )
);

INSERT INTO portfolios (risk, name, btc_weight, eth_weight, usdc_weight)
VALUES ('high', 'El Risky', 0.7, 0.3, 0);

INSERT INTO portfolios (risk, name, btc_weight, eth_weight, usdc_weight)
VALUES ('medium', 'Moderatzione', 0.5, 0.3, 0.2);

INSERT INTO portfolios (risk, name, btc_weight, eth_weight, usdc_weight)
VALUES ('low', 'El Fome', 0.3, 0.1, 0.6);

-- migrate:down

ALTER TABLE users
    DROP COLUMN net_investment;
DROP TABLE portfolios;
DROP TABLE wallets;
DROP TABLE assets;
DROP TYPE risk_profile;