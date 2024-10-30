//https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding

import {db} from "../src/server/db"

async function main() {
    await db.user.upsert({
        where: { id: 1 },
        create: {
            name: "Tenant Placeholderson",
            phone: BigInt(9898887777),
            email: "someTenant@bestmail.com",
            checkIn: new Date("01 Jan 2024 00:00:00 EST"),
            checkOut: new Date("31 Dec 2024 23:59:59 EST"),
            apartment: 1,
            role: "TENANT"
        },
        update: {}
    })

    
    await db.user.upsert({
        where: { id: 2 },
        create: {
            name: "Constructor Robert",
            phone: BigInt(3238789090),
            email: "bob@thebuilder.com",
            checkIn: new Date().toISOString(),
            checkOut: new Date().toISOString(),
            apartment: -1,
            role: "MAINTENANCE"
        },
        update: {}
    })

    await db.user.upsert({
        where: { id: 3 },
        create: {
            name: "Robert'); DROP TABLE users;--",
            phone: BigInt(3270001111),
            email: "bobbytables@xkcd.com",
            checkIn: new Date().toISOString(),
            checkOut: new Date().toISOString(),
            apartment: -1,
            role: "MANAGEMENT"
        },
        update: {}
    })

    await db.request.upsert({
        where: {id: 1},
        create: {
            apartment: 1,
            area: "shower",
            description: "shower so cold its spewing out snow",
            imageURI: "",
            status: "PENDING"

        },
        update: {}
    })

    await db.request.upsert({
        where: {id: 2},
        create: {
            apartment: 33,
            area: "cat",
            description: "cat",
            imageURI: "https://cataas.com/cat",
            status: "COMPLETED"
        },
        update: {}
    })
}

main().then(async () => {
    await db.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
})