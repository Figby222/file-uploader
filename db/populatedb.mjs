import { PrismaClient } from "@prisma/client";
import { genPasswordHash } from "../lib/passwordHashingUtils.mjs";

const prisma = new PrismaClient();

async function main() {
    await prisma.user.createManyAndReturn({
        data: [
            { username: "cookies@cookies.com", password: await genPasswordHash("cookies") },
            { username: "sandwich@sandwich.com", password: await genPasswordHash("sandwich") },
            { username: "sandwich@cookies.com", password: await genPasswordHash("sandwichCookies") },
            { username: "cookies@sandwich.com", password: await genPasswordHash("cookiesSandwich") },
            { username: "Ryan@me.com", password: await genPasswordHash("RyanMe") }
        ]
    }).then(console.log);
}


main();