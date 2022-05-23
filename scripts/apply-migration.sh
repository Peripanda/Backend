source ../.env
dbmate --migrations-dir "../core/db/migrations" --schema-file "../core/db/migrations/schema.sql" -u "postgres://${DB_USER}:${DB_PASSWORD}@${HOST}:${DB_PORT}/${DB_NAME}?sslmode=disable" up
