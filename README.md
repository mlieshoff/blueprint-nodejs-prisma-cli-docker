# blueprint-nodejs-prisma-cli-docker

Blueprint with node.js - Prisma - CLI - Docker

## Prerequisites

For running the application:

- Docker >= 26.1.3
- Postgres >= see Prisma 6.6.0
- https://github.com/ekalinin/nodeenv (maybe)

For developing:

- Node >= 20
- NPM >= 9.2.0
- Make >= 4.3

## How to build?

### Locally

For generating Prisma client:

`make generate`

For building:

`make build`

For running database migrations:

`make migrate`

### With Docker

`docker build -t blueprint .`

## How to use?

### Locally

`make start ARGS=--ls`

### With Docker

`docker run --add-host host.docker.internal:host-gateway -it -e DATABASE_URL=postgres://postgres:postgres@host.docker.internal blueprint -- -ls`

## Virtualenv

Get VirtualEnv and run:

```
$ virtualenv env
$ source env/bin/activate
(env) $ pip install nodeenv
(env) $ nodeenv --version
0.6.5
```

then

`nodeenv --node 22.11.0 nodeenv`

and

`source nodeenv/bin/activate`
