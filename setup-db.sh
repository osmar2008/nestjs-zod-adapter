#!/bin/sh
set -e

echo "creating databases"
docker exec sandbox_db sh -c "echo \"SELECT 'CREATE DATABASE management' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'management')\\gexec\" | psql --username ${POSTGRES_USER:-postgres} --dbname ${POSTGRES_DB:-postgres}"
docker exec sandbox_db sh -c "echo \"SELECT 'CREATE DATABASE core' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'core')\\gexec\" | psql --username ${POSTGRES_USER:-postgres} --dbname ${POSTGRES_DB:-postgres}"