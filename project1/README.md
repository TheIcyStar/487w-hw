# 487w-Project1
CMPSC 487w Project 1 - SUN lab access system

The system keeps track of ID card swipes and their timestamps for five years. These can either be entered manually via the admin web interface or via API. To submit a card swipe via API, submit a POST request to `http://HOSTNAME/api/trpc/swipes.create` with `{userId: INTEGER}` as the payload. To convinietly manually enter the ID, just use the admin web interface, it will create the request and submit it for you.

The admin web interface also displays a list of card swipes, which can be filtered by ID, date, and time range.

Finally, the admin web interface allows to create new IDs or update existing ones. 

**Visual media of code running is in the`/media` directory**

#### High level requirements
- The system must keep track of given IDs for card swipes, associate them with a timestamp, and store the record for 5 years.
- An admin must be able to view the history of card swipes
- An admin must be able to optionally filter the swipe results by ID, date, and/or time range.
- The system must assign metadata to registered IDs, such as the user type (student, faculty, staff, janitor), and if the ID is active.

<br>

## Configuring the project
Copy `.env.example` and rename it to `.env` or `.env.pseudo-prod.local` if running in "production" mode. The intended assignment submission is to not use pseudo-prod. Change any values if necessary, but the defaults should just work.

Then run `npm install`

## Running the project
For development:

`docker compose -f compose-dev.yaml up -d`, `npm run dev`. Connect to the app at http://localhost:3000

Optionally, to view the database use `npx prisma 

For "production":

`docker compose up`. Connect to the app at http://localhost:3000



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