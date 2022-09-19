build:
	docker compose build

up:
	docker compose up

down:
	docker compose down

start:
	docker compose start

stop:
	docker compose stop

restart:
	docker compose restart

bash:
	docker compose exec app bash

attach:
	docker attach tokumo_back-app-1

pull:
	git pull origin main

push:
	git push origin HEAD
