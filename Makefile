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
	docker exec -it ubereats_react_rails-backend-1 bash

attach:
	docker attach ubereats_react_rails-backend-1

pull:
	git pull origin main

push:
	git push origin HEAD
