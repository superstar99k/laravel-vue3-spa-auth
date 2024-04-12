#!/usr/bin/env bash

docker-compose exec -T server bash ./tools/phpcs.sh $@
