//https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding

import {db} from "../src/server/db"

async function main() {
    await db.user.upsert({
        where: { id: 1 }, //904728507
        create: {
            id: 1,
            role: "Student",
            active: true,
            swipes: {
                create: {
                    id: 1,
                }
            }
        },
        update: {}
    })

    await db.user.upsert({
        where: { id: 904728507 },
        create: {
            id: 2,
            role: "Student",
            active: true

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