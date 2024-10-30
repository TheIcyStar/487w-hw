# 487w-Project2
CMPSC 487w Project 2 - Maintenance Request Organization System

(Description here later)

**Visual media of code running is in the`/media` directory**

<br>

## Configuring the project
Copy `.env.example` and rename it to `.env`. Change any values if necessary, but the defaults should just work.

Install dependencies with `npm install`

Set up the database with `npm run db:generate`, and seed it with example data with `npm run db-seed`. [tsx](https://tsx.is/) must be on your system to run db-seed.

## Running the project
`docker compose up -d`, then `npm run dev`. Connect to the app at http://localhost:3000

Optionally, to view the database use `npx prisma studio`

⚠️ Don't use this in a real production environment. If we pretend to have a client, we pretend to have a production 😉



## Tools used:
Create T3 App (TypeScript, NodeJS, NextJS, Prisma)

Docker

Postgres


## Quick cleanup everything
This includes docker stuff outside of this assignment.
```sh
docker container prune -f&&\
docker volume prune -af&&\
docker network prune -f&&\
docker system prune -af&&\
docker image prune -af&&\
docker system prune -af --volumes
```
