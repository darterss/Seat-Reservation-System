#!/bin/bash

echo "Waiting for PostgreSQL to be ready..."
while ! pg_isready -h postgres -p 5432 -U user; do
  sleep 1
done

echo "PostgreSQL is ready. Running migrations..."

# Run Drizzle migrations with config file
npx drizzle-kit push

echo "Migrations completed successfully!"
