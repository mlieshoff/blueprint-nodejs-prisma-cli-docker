format:
	npm run format

build:
	npm run build

generate:
	npx prisma generate

migrate:
	npx prisma migrate deploy

start:
	npm run start -- $(ARGS)

update:
	LOG_LEVEL=debug npx renovate --platform=local --repository-cache=reset