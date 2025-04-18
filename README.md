# blueprint-nodejs-prisma-cli-docker
Blueprint with NodeJS - Prisma - CLI - Docker

docker build -t blueprint .

docker run --add-host host.docker.internal:host-gateway -it -e DATABASE_URL=postgres://postgres:postgres@host.docker.internal blueprint -- -ls

