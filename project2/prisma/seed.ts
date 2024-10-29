//https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding

import {db} from "../src/server/db"

async function main() {
    console.log("Placeholder!")
}

main().then(async () => {
    await db.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
})