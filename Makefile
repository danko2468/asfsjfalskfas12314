# For local development use
.phony: api_build web_build

api_clean:
	rm -rf ./packages/api/dist

api_build: api_clean
	@yarn workspace api build
	@docker build -t todo_api:latest -f ./packages/api/Dockerfile ./packages/api

web_clean:
	rm -rf ./packages/web/.next

web_build: web_clean
	export NEXT_PUBLIC_API_URL=http://localhost:3310
	@yarn workspace web build
	@docker build -t todo_web:latest -f ./packages/web/Dockerfile ./packages/web