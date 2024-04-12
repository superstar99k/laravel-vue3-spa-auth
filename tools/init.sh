#!/usr/bin/env bash

cp src/server/.env.example src/server/.env
docker-compose exec server composer install
docker-compose exec server php artisan key:generate
docker-compose exec server php artisan migrate
docker-compose exec server php artisan storage:link
docker-compose exec server php artisan db:seed --class=DevelopmentSeeder

cp src/client/.env.example src/client/.env
