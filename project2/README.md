# 487w-Project2
CMPSC 487w Project 2 - Maintenance Request Organization System

A web-based maintenance request system for tenants, maintenance crew, and management. fulfilled functional requirements include:
* Tenants are able to create maintenance requests with the area of the problem, a brief description, and an optional photo. The request ID, apartment number, and timestamp are automatically generated.
* Maintenance staff are able to browse all request and filter them by apartment number, area, date range, and status.
* Maintenance staff are able to update the status of a maintenance request
* Management is able to add a new tenant, move them to another apartment, and delete tenant accounts.
* Error checking features include the prevention of assigning multiple tenants to the same apartment

Note that the system also keeps track of maintenance and management accounts, but has an assigned apartment of `-1` for "no apartment", which multiple accounts may be assigned to.

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
