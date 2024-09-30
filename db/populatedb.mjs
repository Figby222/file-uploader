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

    await prisma.folder.createManyAndReturn({
        data: [
            { name: "folder1" },
            { name: "folder2" },
            { name: "folder3" },
            { name: "folder4" },
            { name: "folder5", parentFolderId: 1 }
        ]
    }).then(console.log);

    await prisma.file.createManyAndReturn({
        data: [
            { name: "file1", size: 64 },
            { name: "file2", size: 64 },
            { name: "file3", size: 64 },
            { name: "file4", size: 64 },
            { name: "file5", size: 64, folderId: 1 }
        ]
    }).then(console.log)
}









main();