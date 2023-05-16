# For local development use
.phony: api_build

api_build:
	yarn workspace api build
	docker build -t todo_api:latest -f ./api/Dockerfile ./api