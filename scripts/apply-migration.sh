source ../.env
dbmate --migrations-dir './core/db/migrations' --schema-file '../core/db/migrations/schema.sql' -u 'postgres://peripandauser:password@localhost:5432/defaultdb?sslmode=disable' up
